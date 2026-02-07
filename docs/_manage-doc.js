import fs from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'node:url';
import { spawn, execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '../');
const docsDir = path.join(rootDir, 'docs');

const outputDir = path.join(rootDir, '.documentation-output');
const backupDir = path.join(rootDir, '.docs_backup');

const keepFiles = process.argv.includes('--keep');


// ----------------------//
// --- CONFIGURATION --- //
// ----------------------//

// Initializing the list of files to be processed
// Here we store both the original path AND the future path in the backup folder
const filesToProcess = [
  {
    originalPath: path.join(rootDir, 'README.md'),
    backupPath: path.join(backupDir, 'root_README.md'),
    type: 'root'
  }
];

// Dynamically adding files from the docs/ folder
if (fs.existsSync(docsDir)) {
  const docFiles = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));

  docFiles.forEach(file => {
    filesToProcess.push({
      originalPath: path.join(docsDir, file),
      backupPath: path.join(backupDir, `docs_${file}`),
      type: 'doc'
    });
  });
}


// ----------------------------//
// --- UTILITIES FUNCTIONS --- //
// ----------------------------//

function gitIgnoreFile(filePath) {
  try {
    const relativePath = path.relative(rootDir, filePath);

    execSync(`git update-index --assume-unchanged "${relativePath}"`, { cwd: rootDir, stdio: 'ignore' });
    console.log(`🙈 Git ignoring: ${path.basename(filePath)}`);
  }
  catch (e) {
    // It is unknown whether the file is not tracked
  }
}

function gitTrackFile(filePath) {
  try {
    const relativePath = path.relative(rootDir, filePath);

    execSync(`git update-index --no-assume-unchanged "${relativePath}"`, { cwd: rootDir, stdio: 'ignore' });
    console.log(`👀 Git tracking: ${path.basename(filePath)}`);
  }
  catch (e) {
    // Ignore errors
  }
}


// ---------------------//
// --- TRANSFORMERS --- //
// ---------------------//

function transformLinks(content, fileType) {
  const linkReplacer = (_match, filepath, anchor) => {
    const filename = path.basename(filepath, '.md');
    const slug = filename.toLowerCase();
    return `](additional-documentation/${slug}.html${anchor ? '#' + anchor : ''})`;
  };

  const siblingReplacer = (_match, filepath, anchor) => {
    const filename = path.basename(filepath, '.md');
    const slug = filename.toLowerCase();
    return `](${slug}.html${anchor ? '#' + anchor : ''})`;
  };

  if (fileType === 'root') {
    content = content.replace(/\]\((?:\.\/)?docs\/(.+?)\.md(?:#(.+?))?\)/g, linkReplacer);
  }
  else {
    content = content
      .replace(/\]\((?:\.\/)?(.+?)\.md(?:#(.+?))?\)/g, siblingReplacer)
      .replace(/\]\((?:\.\.\/)?README\.md\)/g, '](overview.html)');
  }

  return content;
}


// ---------------------//
// --- MAIN PROCESS --- //
// ---------------------//

// 1. CRASH RECOVERY
if (fs.existsSync(backupDir)) {
  console.warn('⚠️  Previous backup detected. Restoring files before starting...');

  filesToProcess.forEach(file => {
    if (fs.existsSync(file.backupPath)) {

      try {
        fs.copyFileSync(file.backupPath, file.originalPath);
        gitTrackFile(file.originalPath);
      }
      catch(e) {
        console.error('❌ CRITICAL : Unable to restore backups !');
        console.error('To prevent data loss, process has been stopped.');
        console.error('👉 Please manually check all the .md files and delete all backup files');
        console.error(e);
        process.exit(1);
      }
    }
  });

  try {
    fs.rmSync(backupDir, { recursive: true, force: true });
  }
  catch(e) {
    console.warn(`⚠️ Warning: Could not delete old backup dir: ${e.message}`);
  }
}

console.log('📦 Preparing documentation files...');
fs.mkdirSync(backupDir, { recursive: true });

// 2. BACKUP & TRANSFORMATION
filesToProcess.forEach(file => {
  // "Time-of-check to time-of-use" safety: use file descriptor to write files after backup
  try {
    fs.copyFileSync(file.originalPath, file.backupPath);
    gitIgnoreFile(file.originalPath);

    let content = fs.readFileSync(file.originalPath, 'utf8');
    content = transformLinks(content, file.type);

    fs.writeFileSync(file.originalPath, content, 'utf8');
  }
  catch (e) {
    if (e.code === 'ENOENT') {
      return;
    }

    console.warn(`⚠️ Warning: Could not process ${path.basename(file.originalPath)}: ${error.message}`);
  }
});

console.log(`🔄 Links transformed & backup secured in ${backupDir}`);
console.log('🙈 Git is strictly ignoring documentation changes.');


// --------------------------//
// --- COMPODOC LAUNCHER --- //
// --------------------------//

const mode = process.argv[2] || 'build';
const isServe = mode === 'serve';
const args = [];

if (isServe) args.push('-s', '-w');

console.log(`🚀 Launching Compodoc in mode : ${mode.toUpperCase()}`);

const child = spawn('npx', ['compodoc', ...args], { stdio: 'inherit', cwd: rootDir, shell: true });
// Pass the exitCode to the restore function to see if it was successful
child.on('close', (code) => restoreAndExit(code));


process.on('SIGINT', () => {
  console.log('\n🛑 Shutdown detected...');
  restoreAndExit(0);
});


// -----------------------//
// --- RESTORE & EXIT --- //
// -----------------------//

function restoreAndExit(code = 0) {
  console.log('\n♻️  Restoring original files...');

  filesToProcess.forEach(file => {
    try {
      if (fs.existsSync(file.backupPath)) {
        fs.copyFileSync(file.backupPath, file.originalPath);
      }

      gitTrackFile(file.originalPath);
    }
    catch (e) {
      console.error(`⚠️ Error restoring ${path.basename(file.originalPath)}:`, e);
    }
  });

  // Removing backup directory
  if (!keepFiles && fs.existsSync(backupDir)) {
    try {
      fs.rmSync(backupDir, { recursive: true, force: true });
    }
    catch(e) {}

    console.log('🗑️  Backup cleaned.');
  }

  // Clean Output ONLY ON FAILURE (or just a temporary server)
  if (!keepFiles && fs.existsSync(outputDir)) {
    if (code !== 0 || isServe) {
      try {
        fs.rmSync(outputDir, { recursive: true, force: true });

        console.log(code !== 0 ? '🧹 Failed build output cleaned.' : '🧹 Temporary server output cleaned.');
      }
      catch(e) {}
    }
  }

  process.exit(code);
}
