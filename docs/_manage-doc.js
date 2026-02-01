import fs from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '../');

const readmePath = path.join(rootDir, 'README.md');
const backupPath = path.join(rootDir, 'README_BACKUP.md');

// 1. Saving original README.md
// First we check that a backup not already exist
if (fs.existsSync(backupPath)) {
  console.log('⚠️ A backup already exists. Forced restore before starting.');
  try {
    fs.copyFileSync(backupPath, readmePath);
  }
  catch(e) {
    console.error('❌ CRITICAL : Unable to restore the previous backup !');
    console.error('To prevent data loss process has been stopped.');
    console.error('👉 Please manually check README.md and delete README_BACKUP.md');
    console.error(e);
    process.exit(1);
  }
}

if (fs.existsSync(readmePath)) {
  fs.copyFileSync(readmePath, backupPath);
}

// 2. Link transformation for Compodoc
try {
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

// 4. Launch of the Compodoc process
// shell: true is essential on Windows to execute NPM/PNPM commands
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
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, readmePath);
      fs.unlinkSync(backupPath);
      console.log('✅ Original README.md restored.');
    }
  }
  catch (e) {
    console.error('⚠️ Error during restoration : ', e);
  }
  process.exit(code);
}
