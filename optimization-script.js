const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const url = 'https://mismanosabiertas.netlify.app/';
const outputDir = path.join(__dirname, 'reports');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputName = `lighthouse-report-${timestamp}.json`;
const outputPath = path.join(outputDir, outputName);

// Ensure reports directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Run Lighthouse via npx
console.log('Running Lighthouse audit...');
const result = spawnSync('npx', [
  'lighthouse',
  url,
  '--output=json',
  `--output-path=${outputPath}`,
  '--preset=desktop',
  '--chrome-flags=--headless',
  '--quiet'
], { stdio: 'inherit' });

if (result.error) {
  console.error('Failed to run Lighthouse:', result.error);
  process.exit(1);
}

console.log(`\nAudit complete. Report saved to: ${outputPath}`);

// Optionally, display scores
try {
  const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  const categories = report.categories;
  console.log('\nScores:');
  for (const [name, info] of Object.entries(categories)) {
    if (info.score !== null) {
      console.log(`${name.padEnd(20)}: ${(info.score * 100).toFixed(0)}%`);
    }
  }
} catch (e) {
  console.warn('Could not parse report for summary:', e.message);
}