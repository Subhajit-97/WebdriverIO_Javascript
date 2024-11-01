const Excel = require("exceljs");
class Exceldata {
  // static filepath = "C:/Users/Subhajit/Desktop/Book1.xlsx";
  // static filepath = "D:/Automation_Testing/WebdriverIO_JS/test/data/Book1.xlsx";
  static filepath = process.env.EXCEL_FILE_PATH || "./test/data/Book1.xlsx";
  constructor(filepath, sheetName) {
    this.filepath = filepath || this.filepath;
    this.sheetName = sheetName;
  }
  static async read(columnName) {
    let workbook = new Excel.Workbook();
    try {
      await workbook.xlsx.readFile(this.filepath);
      const columnData = [];
      let worksheet = workbook.getWorksheet(Exceldata.sheetName);
      if (!worksheet) {
        throw new Error(
          `Sheet '${Exceldata.sheetName}' not found in the workbook`
        );
      }
      const maxColumns = worksheet.actualColumnCount;
      let columnIndex = -1;
      for (let i = 1; i <= maxColumns; i++) {
        if (worksheet.getRow(1).getCell(i).value === columnName) {
          columnIndex = i;
          break;
        }
      }
      if (columnIndex === -1) {
        throw new Error(`Column '${columnName}' not found in the workbook`);
      }
      const rows = worksheet.rowCount;
      for (let j = 2; j <= rows; j++) {
        const row = worksheet.getRow(j);
        columnData.push(row.getCell(columnIndex).value);
      }
      return columnData.toString();
    } catch (error) {
      console.error("Error reading the excel file:", error.message);
      throw error;
    }
  }
}
module.exports = Exceldata;
