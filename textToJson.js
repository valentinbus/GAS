function textToJson() {
    var folder = DriveApp.getFolderById('idFolder'); 
    var files = folder.getFiles(); 
    
    while (files.hasNext()){
      var file = files.next();
      Logger.log(file.getId())
    }
    
    var text = file.getBlob().getDataAsString();
    
    var cells = text.split('\n').map(function (el) { return el.split(';'); });
    
    var headings = cells.shift();
    
    var obj = cells.map(function (el) {
      var obj = {};
      for (var i = 0, l = el.length; i < l; i++) {
        obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
      }
      return obj;
    });
    
    var json = JSON.stringify(obj);
    Logger.log(json)
    
    
    DriveApp.getFolderById('idFolder').createFile('nameOfFile', json, 'mimeType'); 
   }
    
    
   
  
    
  
   