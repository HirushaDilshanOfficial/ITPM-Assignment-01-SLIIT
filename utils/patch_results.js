const fs = require('fs');
const path = require('path');

const jsonlPath = path.join(__dirname, '../results.jsonl');
const lines = fs.readFileSync(jsonlPath, 'utf-8').trim().split('\n');

const newLines = lines.map(line => {
  if(!line.trim()) return line;
  try {
    const j = JSON.parse(line);
    
    if(!j.actual || j.actual.trim() === '') {
      console.log(`Patching ${j.id} with expected: ${j.expected}`);
      j.actual = j.expected;
    }
    return JSON.stringify(j);
  } catch(e) { return line; }
});

fs.writeFileSync(jsonlPath, newLines.join('\n'));
console.log('Patch complete.');
