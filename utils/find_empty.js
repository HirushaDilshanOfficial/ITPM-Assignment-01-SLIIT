const fs = require('fs');
const path = require('path');

const jsonlPath = path.join(__dirname, '../results.jsonl');
const lines = fs.readFileSync(jsonlPath, 'utf-8').split('\n');
const empty = [];
lines.forEach(line => {
  if(!line.trim()) return;
  try {
    const j = JSON.parse(line);
    if(!j.actual || j.actual.trim() === '') empty.push(j.id);
  } catch(e) {}
});
console.log('Empty IDs:', empty.join(', '));
console.log('Total Empty:', empty.length);
