function convertDocToSheet() {
    var spreadSheet = SpreadsheetApp.openById('IdDocument.txt');
    var sheet = spreadSheet.getActiveSheet(); 
    var maxRows = sheet.getMaxRows();
    var maxColumns = sheet.getMaxColumns();
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var folder = DriveApp.getFolderById('IdFolder');
    var files = folder.getFiles(); 
    
    //Récupère le contenu du fichier.txt
    while(files.hasNext()){
      var file = files.next(); 
      if (file.getName() == "nameOfDoc"){
        var data = file.getBlob();
        var text = data.getDataAsString();
      }
    }
    
   
    //Itérateur de comparaison de début
    var n = 0;
    var i = 0;
    while(i<=maxRows){
      i++;
      var range = sheet.getRange(i, 3, maxRows, maxColumns);
      var background = range.getBackground();
      if(background == '#ff0000'){
        n++;
      }
    }
    
    
    //Initialisation
    sheet.getRange(1,1,maxRows,maxColumns).setValue('').setBackground('white'); 
    sheet.getRange(1, 1, maxRows, maxColumns).setHorizontalAlignment('center').setBackground('white').setFontSize(10).setFontWeight('normal');
    
    //Divise le texte en ligne 
    var tabH = text.split('\n');
    
    //Subdivise les lignes en mots et les attribue à des cases indépendantes
    for(var i = 0; i<=tabH.length-1; i++){
      var tab = tabH[i].split(';');
      for(var k = 1; k<=tab.length; k++){
        var mot = tab[k - 1];
        sheet.getRange(i+1, k).setValue(mot); 
        }
      }
      
      
    //Attribue le background aux nbr_users 0 || détermine l'itérateur de comparaison de fin
    var l = 0;
    var i = 0;
    while(i<=maxRows){
      i++;
      var rangeUser = sheet.getRange(i, 3).getValues(); 
      var rangeCharge = sheet.getRange(i, 4).getValues(); 
      Logger.log(rangeCharge[0][0]); 
      if(rangeUser[0][0] == 0 && rangeCharge[0][0] != 10000 && typeof rangeCharge[0][0] != 'string' && rangeCharge[0][0]!=0){
         sheet.getRange(i, 1, 1, 4).setBackground('red'); 
         l++;
       }
     }
    Logger.log('nbr de nbr_user étant à zero au debut = '+ n);
    Logger.log('nbr de nbr_user étant à zero à la fin ='+ l); 
    
    //Tri par ordre croissant de users + mise en forme
    var range = sheet.getRange(2, 1, maxRows - 1, maxColumns).sort(3); 
    sheet.getRange(1,1,1,4).setFontSize(15).setFontWeight('bold').setBackground('#dddddd'); 
    
    
    //Remonte les lignes d'alerte en haut du document
    var i = 3;
    while(i<=maxRows){
      var range = sheet.getRange(i, 1, 1, 4);
      var background = range.getBackground();
      if(background == '#ff0000'){
        sheet.moveRows(range, 2); 
      }
      i++;
     } 
    
    //Supprime les lignes/colones empty
    if (maxRows-lastRow != 0){
        sheet.deleteRows(lastRow+1, maxRows-lastRow);
    }
    if (maxColumns-lastColumn != 0){
        sheet.deleteColumns(lastColumn+1, maxColumns-lastColumn);
    }
   
    //Envoie de l'alerte si nouveau problème détecté
    
    /*var nbr_alerte = l-n;
    var title = 'Alerte Citrix User';
    var body1  = nbr_alerte + ' problème est survenu. \nCi-joint le lien du rapport : https://docs.google.com/spreadsheets/d/1Qheig5djYrmbQzikUDJbhP1oErgkF2sw3cGsIupcVCE/edit#gid=0 \n \n Cordialement, \n Valentin Bus';
    var body2  = nbr_alerte + ' problèmes sont survenus. \nCi-joint le lien du rapport : https://docs.google.com/spreadsheets/d/1Qheig5djYrmbQzikUDJbhP1oErgkF2sw3cGsIupcVCE/edit#gid=0 \n \n Cordialement, \n Valentin Bus';
    var d = new Date();
    var curr_hour = d.getHours();
    var curr_day = d.getDay();
    Logger.log(curr_day)
    
    if(curr_day != 0 && curr_day != 6){
      if(curr_hour>=8 && curr_hour<=17){
        if(n != l && n < l ){
          if(nbr_alerte == 1){
           GmailApp.sendEmail('valentin.bus-ext@veolia.com, mohammed.chandoul.ext@veolia.com, abdelali.kamrach@veolia.com, vincent.vu-ext@veolia.com', title, body1); 
           }
          else{
           GmailApp.sendEmail('valentin.bus-ext@veolia.com, mohammed.chandoul.ext@veolia.com, abdelali.kamrach@veolia.com, vincent.vu-ext@veolia.com, yoann.monteillet@veolia.com', title, body2); 
          }
        }
      }
    }*/
  }