function exportToSheets() {
  var projectId = 'idProject'
  
  var request = {
    query : 'Requête BigQuery',
    useLegacySql: false
    };
  var queryResults = BigQuery.Jobs.query(request, projectId);
  var jobId = queryResults.jobReference.jobId;
  Logger.log(jobId)
  
  var sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  // Get all the rows of results.
  var rows = queryResults.rows;
  while (queryResults.pageToken) {
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
      pageToken: queryResults.pageToken
    });
    rows = rows.concat(queryResults.rows);
  }

  if (rows) {
    var date = new Date();
    var spreadsheet = SpreadsheetApp.create('nameDocument');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = queryResults.schema.fields.map(function(field) {
      return field.name;
    });
    sheet.appendRow(headers);

    // Append the results.
    var data = new Array(rows.length);
    for (var i = 0; i < rows.length; i++) {
      var cols = rows[i].f;
      data[i] = new Array(cols.length);
      for (var j = 0; j < cols.length; j++) {
        data[i][j] = cols[j].v;
      }
    } 
    sheet.getRange(2, 1, rows.length, headers.length).setValues(data);
    
} 
  // Mise en forme
  var maxRows = sheet.getMaxRows();
  var maxColumns = sheet.getMaxColumns();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  sheet.getRange(1, 1, maxRows, maxColumns).setHorizontalAlignment('center').setBackground('white').setFontSize(10).setFontWeight('normal');
  sheet.getRange(1,1,1,maxColumns).setFontSize(15).setFontWeight('bold').setBackground('#dddddd'); 
    //Supprime les lignes/colones empty
  if (maxRows-lastRow != 0){
      sheet.deleteRows(lastRow+1, maxRows-lastRow);
  }
  if (maxColumns-lastColumn != 0){
      sheet.deleteColumns(lastColumn+1, maxColumns-lastColumn);
    }
    
  var files = DriveApp.getFilesByName('test2_view_midBddAppli' + ' ' + date);
  while (files.hasNext()) {
    var file = files.next();
    Logger.log(file.getName());
 }
  Logger.log(typeof file);
  var folder = DriveApp.getFolderById('1aauqGcTG5fpKAPptaoOHshVcNf0LymmB');
  Logger.log(folder);
  folder.addFile(file);
}





















