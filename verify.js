const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const requiredFiles = [
  'README.md',
  'performance-improvements.md',
  'accessibility-improvements.md',
  'best-practices-improvements.md',
  'seo-checklist.md',
  'sample-optimized-index.html',
  'optimization-script.js',
  'run-lighthouse.bat',
  'QUE_HACER.md',
  'package.json'
];

let missing = [];
for (const file of requiredFiles) {
  const filePath = path.join(baseDir, file);
  if (!fs.existsSync(filePath)) {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error('Verification failed: Missing files:');
  missing.forEach(f => console.error(`  - ${f}`));
  process.exit(1);
} else {
  console.log('Verification passed: All required files are present.');
  process.exit(0);
}