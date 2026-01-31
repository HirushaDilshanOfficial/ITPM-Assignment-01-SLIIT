const ExcelJS = require('exceljs');
const path = require('path');

const filePath = path.join(__dirname, '../IT23699908.xlsx');
const wb = new ExcelJS.Workbook();

wb.xlsx.readFile(filePath).then(() => {
  const ws = wb.getWorksheet('Test Cases');
  if(!ws) { console.log('Worksheet not found'); return; }
  console.log('Total Rows (including header):', ws.rowCount);
  const counts = { Pos: 0, Neg: 0, UI: 0, Other: 0 };
  const ids = [];
  ws.eachRow((row, rowNumber) => {
    if(rowNumber === 1) return; 
    const id = row.getCell(1).value;
    ids.push(id);
    if(id.startsWith('Pos_Fun')) counts.Pos++;
    else if(id.startsWith('Neg_Fun')) counts.Neg++;
    else if(id.startsWith('Pos_UI')) counts.UI++;
    else counts.Other++;
  });
  console.log('Counts:', counts);
  console.log('IDs:', ids.sort().join(', '));
}).catch(err => console.error(err));
