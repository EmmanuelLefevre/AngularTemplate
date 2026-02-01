import fs from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'node:url';
import { spawn, execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '../');

const readmePath = path.join(rootDir, 'README.md');
const backupPath = path.join(rootDir, 'README_BACKUP.md');
const outputDir = path.join(rootDir, '.documentation-output');

// --- GIT UTILITIES FUNCTIONS ---
function gitIgnoreFile() {
  try {
    // Tells Git to temporarily ignore changes to this file
    execSync('git update-index --assume-unchanged README.md', { cwd: rootDir, stdio: 'ignore' });
    console.log('🙈 Git is strictly ignoring README.md changes during generation.');
  }
  catch (e) {
    console.error(e);
  }
}

function gitTrackFile() {
  try {
    // Tell Git to start tracking the file normally again
    execSync('git update-index --no-assume-unchanged README.md', { cwd: rootDir, stdio: 'ignore' });
    console.log('👀 Git is tracking README.md again.');
  }
  catch (e) {
    console.error(e);
  }
}

// 1. Saving original README.md
if (fs.existsSync(backupPath)) {
  console.log('⚠️ A backup already exists. Forced restore before starting.');
  try {
    // Restore original file
    fs.copyFileSync(backupPath, readmePath);
    // Delete old corrupted backup
    fs.unlinkSync(backupPath);
  }
  catch(e) {
    console.error('❌ CRITICAL : Unable to restore the previous backup !');
    console.error('To prevent data loss process has been stopped.');
    console.error('👉 Please manually check README.md and delete README_BACKUP.md');
    console.error(e);
    process.exit(1);
  }
}

// Create a fresh backup for this session
if (fs.existsSync(readmePath)) {
  fs.copyFileSync(readmePath, backupPath);
}

// 2. Link transformation for Compodoc and Git Lockdown
try {
  // Lock Git BEFORE modifying the file
  gitIgnoreFile();

  let content = fs.readFileSync(readmePath, 'utf8');

  // Transform [Title](./docs/XXX.md) into [Title](additional-documentation/xxx.html)
  content = content.replace(/\]\(\.\/docs\/(.+?)\.md\)/g, (_match, filename) => {
    return `](additional-documentation/${filename.toLowerCase()}.html)`;
  });

  fs.writeFileSync(readmePath, content);
  console.log('🔄 README.md prepared for Compodoc (Corrected links).');
}
catch (err) {
  console.error('❌ Error during preparation : ', err);
  restoreAndExit(1);
}

// 3. Determine command line arguments
const mode = process.argv[2] || 'build';
const isServe = mode === 'serve';

console.log(`🚀 Launching Compodoc in mode : ${mode.toUpperCase()}`);

const args = [];
if (isServe) {
  args.push('-s', '-w');
}

// 4. Launch Compodoc process
const child = spawn('npx', ['compodoc', ...args], {
  stdio: 'inherit',
  cwd: rootDir,
  shell: true
});

child.on('error', (err) => {
  console.error('❌ Critical error during Compodoc launch : ', err);
  restoreAndExit(1);
});

child.on('close', (code) => {
  restoreAndExit(code);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutdown detected...');
  restoreAndExit(0);
});

function restoreAndExit(code = 0) {
  try {
    // Restore original README.md
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, readmePath);
      fs.unlinkSync(backupPath);
      console.log('✅ Original README.md restored.');
    }

    // Reactivating Git tracking
    gitTrackFile();

    // Delete output folder
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
      console.log('🧹 Documentation output directory cleaned.');
    }
  }
  catch (e) {
    console.error('⚠️ Error during restoration : ', e);
    gitTrackFile();
  }
  process.exit(code);
}
