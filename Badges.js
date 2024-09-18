function badgesData() {

var conn = Jdbc.getConnection(url, username, password);
var stmt = conn.createStatement();

var spreadsheet = SpreadsheetApp.getActive();
let dashboard = spreadsheet.getSheetByName('Dashboard');
var cell = dashboard.getRange('B5').getValues();


 var sheet = spreadsheet.getSheetByName('Badges');
 sheet.clearContents();
  sheet.clearFormats();




// start of badges function
function badges(flip, title)
{
sheet.appendRow([,title]);
let row = sheet.getLastRow();
//console.log(row);
sheet.getRange(row, 1, 2, 24).setFontWeight("bold");

if (flip==="badges") {
 var results = stmt.executeQuery('select "Given Badge", db.`first_name` "First Name",`nickname` "Facebook Name",stats_volunteer_for_numerator_cached "Volunteered For",db.id "Clan ID" from wp_member_db db JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + '  AND status in ("wc-processing", "wc-onhold", "wc-on-hold") AND ((`stats_volunteer_for_numerator_cached`>=3) OR (`stats_volunteer_for_numerator_cached`=2 AND pd.cc_volunteer<>"none")) AND ((milestones_3_badge IS NULL) OR (milestones_3_badge ="due")) order by db.`first_name`,CAST(db.stats_volunteer_for_numerator_cached AS UNSIGNED INTEGER) desc')
}
else if (flip==="nonbadges"){
 var results = stmt.executeQuery('select "Given Badge", db.`first_name` "First Name",`nickname` "Facebook Name",milestones_3_badge_marked_given_by "Given by",FROM_UNIXTIME((milestones_3_badge_marked_given_at)/1000, "%d %M %Y") "Given on" from wp_member_db db JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + '  AND status in ("wc-processing", "wc-onhold", "wc-on-hold") AND milestones_3_badge="given" order by db.`first_name`,CAST(db.stats_volunteer_for_numerator_cached AS UNSIGNED INTEGER) desc')
}

  //console.log(results);
 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var arr=[];
  for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnLabel(col + 1));
 }
  sheet.appendRow(arr);
 while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
 }
sheet.autoResizeColumns(1, numCols+1);




} //end of badges

// full options
//help online beforehand,help at sign-in,help around announcements and cake time,do announcements,help online afterwards,be event director for the evening

badges("badges", "People who need badges");
badges("nonbadges", "People who have been given badges");

setColoursFormat(sheet, "C3:C1000","none","#DAF7A6 ")
setColoursFormat(sheet, "C3:C1000","Selected","#FFFFFF")
setColoursFormat(sheet, "C3:C1000","","#e0ffff")
setTextFormat(sheet,"D2:N1000","No","#a9a9a9")
sheet.setColumnWidth(17, 300);
sheet.setColumnWidth(1, 150);
setWrapped(sheet,"q2:q1000");
  var range = SpreadsheetApp.getActive().getRange("Badges!A3:A150");
  range.insertCheckboxes();




} 

function markGivenBadge(){
// get current sheet
// get user to mark
// get order to mark
// get current google user


 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Badges');
  var active_range = sheet.getActiveRange();
  var currentRow = active_range.getRowIndex();
 // var currentRow = "5";
  console.log(currentRow);


  if(currentRow <=2){Browser.msgBox('Select an actual signup', Browser.Buttons.OK); return;}
    if(currentRow >=100){Browser.msgBox('Select an actual signup', Browser.Buttons.OK); return;}


  var user_id = sheet.getRange(currentRow, 5,1,1).getValue();  /// get submission ID 1 BV ( was 67)
  var first_name = sheet.getRange(currentRow, 2,1,1).getValue();  /// get submission ID 1 BV ( was 67)

  console.log(user_id);
  
if(user_id === "" || user_id ===  "user_id"){Browser.msgBox('No User ID Found', Browser.Buttons.OK); return;} 




 // if (Browser.msgBox("Given a badge to " +first_name + "? \n User " + user_id, Browser.Buttons.OK_CANCEL) == "ok") { 



let cc_attendance_setter =  Session.getActiveUser().getEmail();

let metakey = "milestones_3_marked"
let metavalue = "given";
let metakey2 = "milestones_3_badge"
let datetime = Date.now(); 
//Logger.log(datetime);

var data = {"meta_data": [
    {"key": metakey,
    "value": metavalue}, 
    {"key": metakey2,
    "value": metavalue}, 
    {"key": "milestones_3_badge_marked_given_at",
    "value": datetime}, 
    {"key": "milestones_3_badge_marked_given_by",
    "value": cc_attendance_setter }
  ], 
};

let returndata =  pokeToWooUserMeta(data, user_id); //returns JSON object
returndata = returndata.getContentText();
returndata= JSON.parse(returndata)

/*
Logger.log("type " + typeof(returndata)); // type object
Logger.log(returndata.data); // Logging output too large. Truncating output. {"id":52,"date_created":"2021-08-27T23:24:39","date_created_gmt":"2021-08-27T22:24:39","date_modified":"2022-11-23T11:51:41", etc etc etc
//Logger.log(returndata[0]); //null
Logger.log("type " + typeof(returndata.id)); //type undefined
Logger.log(returndata.data.id); //null
*/
let search = returndata.meta_data.find(({key}) => key == "milestones_3_badge")?.value;

Logger.log(search); 

if (search === metavalue){
  sheet.getRange(currentRow, 4,1,1).setValue("Given");   // paste the blank variables into the cells to delete contents
sheet.getRange(currentRow, 1,1,1).setValue("TRUE");   // paste the blank variables into the cells to delete contents

return metavalue  
}
else {
    Logger.log("ERROR" + search);

  return "ERROR" + search

}

//Logger.log(returnvalue.meta_data);
//Logger.log(" type " + typeof(returnvalue.meta_data));

//Logger.log(JSON.parse(returnvalue));
//Logger.log(JSON.stringify(returnvalue.meta_data));





//return returndata;
}




