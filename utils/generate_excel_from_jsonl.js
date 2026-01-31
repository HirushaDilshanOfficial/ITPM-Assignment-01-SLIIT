const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const testCases = require('../data/test_cases.json');

const jsonlPath = path.join(__dirname, '../results.jsonl');
const outputFilePath = path.join(__dirname, '../IT23699908.xlsx');

async function generate() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Test Cases');

  // Define Columns
  worksheet.columns = [
    { header: 'TC ID', key: 'id', width: 15 },
    { header: 'Test case name', key: 'name', width: 25 },
    { header: 'Input length type', key: 'length', width: 10 },
    { header: 'Input', key: 'input', width: 40 },
    { header: 'Expected output', key: 'expected', width: 40 },
    { header: 'Actual output', key: 'actual', width: 40 },
    { header: 'Status', key: 'status', width: 10 },
    { header: 'Accuracy justification', key: 'justification', width: 40 },
    { header: 'What is covered by the test', key: 'covered', width: 30 }
  ];

  // Style the header
  worksheet.getRow(1).font = { bold: true };

  // Read results
  let resultsMap = new Map();
  if (fs.existsSync(jsonlPath)) {
    const lines = fs.readFileSync(jsonlPath, 'utf-8').split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const res = JSON.parse(line);
        resultsMap.set(res.id, res);
      } catch (e) {
        console.error('Error parsing JSON line:', e);
      }
    }
  }

  
  let passCount = 0;
  let failCount = 0;

  for (const tc of testCases) {
    let result = resultsMap.get(tc.id);

    
    if (!result) {
      console.warn(`Missing result for ${tc.id}, using definition values.`);
      result = {
        id: tc.id,
        name: tc.name,
        length: tc.length,
        input: tc.input,
        expected: tc.expected,
        actual: tc.actual || "", 
        status: "Fail", 
        justification: tc.description,
        covered: tc.category
      };
      failCount++;
    } else {
        passCount++;
    }

    
    const row = worksheet.addRow({
      id: result.id,
      name: result.name,
      length: result.length,
      input: result.input,
      expected: result.expected,
      actual: result.actual,
      status: result.status,
      justification: result.justification,
      covered: result.covered
    });

    
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { vertical: 'top', wrapText: true };
    });
  }

  
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.height = 30;
  headerRow.eachCell((cell) => {
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFEEEEEE' } 
    };
  });

  await workbook.xlsx.writeFile(outputFilePath);
  console.log(`Report generated: ${outputFilePath}`);
  console.log(`Total: ${testCases.length}, Present: ${passCount}, Missing/Fail: ${failCount}`);
}

generate();
