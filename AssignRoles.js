function assignLiftSharingCoordinator(){
  let cc_volunteer = "Lift Coordinator";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignActivitiesCoordinator() {
  let cc_volunteer = "Climbing & Activity Coordinator";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignKitCoordinator() {
  let cc_volunteer = "Kit & Skills Coordinator";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignBuddyCoordinator() {
  let cc_volunteer = "Buddy Coordinator";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignTripReporter() {
  let cc_volunteer = "Event Reporter";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignBreakfastMarshal() {
  let cc_volunteer = "Breakfast Marshal";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignLunchMarshal() {
  let cc_volunteer = "Lunch Marshal";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignCovidMarshal() {
  let cc_volunteer = "Covid Marshal";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignEveningMealWashingUpMarshal() {
  let cc_volunteer = "Evening Meal Washing Up Marshal";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignHeadChef() {
  let cc_volunteer = "Head Chef";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignEveningMealChef() {
  let cc_volunteer = "Evening Meal Chef";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignLunchAndBreakfastChef() {
  let cc_volunteer = "Breakfast & Lunch Buyer";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignTripDirector() {
  let cc_volunteer = "Event Director";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}

function assignAssistantTripDirector() {
  let cc_volunteer = "Assistant Event Director";
  let volunteer = searchEmailsSheet(cc_volunteer);
  assignRole(volunteer);
}


function markVolunteerClear(){
  if (Browser.msgBox("This won't notify the person automatically that their roles has been cancelled - you will want to do that", Browser.Buttons.OK_CANCEL) == "ok") {
    let cc_volunteer = "none";
    let volunteer = searchEmailsSheet(cc_volunteer);
    assignRole(volunteer);
  }
}


function assignRole(volunteer, cc_volunteer_old ) {

 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Volunteering');
  var active_range = sheet.getActiveRange();
  var currentRow = active_range.getRowIndex();
  //var currentRow = "5";
  console.log("Row " + currentRow);


  if(currentRow <=1){Browser.msgBox('Select an actual signup', Browser.Buttons.OK); return;}
    if(currentRow >=100){Browser.msgBox('Select an actual signup', Browser.Buttons.OK); return;}


  var order_id = Number(sheet.getRange(currentRow, 26,1,1).getValue());  /// get submission ID 1 BV ( was 67)
  var first_name = String(sheet.getRange(currentRow, 1,1,1).getValue());  /// get submission ID 1 BV ( was 67)

  console.log(order_id);
  
if(order_id === "" || order_id ===  "order_id"){Browser.msgBox('No Order ID Found', Browser.Buttons.OK); return;} 
if (Browser.msgBox("Assign " + volunteer.cc_volunteer + " to " +first_name + "? \n Order " + order_id, Browser.Buttons.OK_CANCEL) == "ok") { 

let cc_role_assigner =  Session.getActiveUser().getEmail();
let noteToOrder = "#!Assigned Role by: " + cc_role_assigner
let currentTime = new Date().getTime();

let data = {"meta_data": [
    {"key": "cc_volunteer_old",
    "value": volunteer.cc_volunteer_old}, 
    {"key": "cc_volunteer",
    "value": volunteer.cc_volunteer}, 
    {"key": "cc_volunteer_role_description_sentence",
    "value": volunteer.cc_volunteer_role_description_sentence}, 
    {"key": "cc_volunteer_role_description_time",
    "value": volunteer.cc_volunteer_role_description_time}, 
    {"key": "cc_volunteer_reminder_time",
    "value": volunteer.cc_volunteer_reminder_time}, 
    {"key": "cc_volunteer_role_description_post_event_sentence",
    "value": volunteer.cc_volunteer_role_description_post_event_sentence}, 
    {"key": "cc_volunteer_role_instructions_url",
    "value": volunteer.cc_volunteer_role_instructions_url}, 
    {"key": "cc_volunteer_role_assigned_by",
    "value": cc_role_assigner },
    {"key": "cc_volunteer_role_assigned_at",
    "value": currentTime }
  ], 
//   "status": orderstatus
};


let orderDataOutcome = pokeToWordPressOrders(data, order_id)
let orderNoteOutcome = pokeNoteToOrder(order_id, noteToOrder)

if (orderDataOutcome === "Error" || orderNoteOutcome === "Error") {
  throw new Error("One or more variables contain an 'Error' string.")
  return
}
  
var blankArray =[[volunteer.cc_volunteer]];  
sheet.getRange(currentRow, 3,1,1).setValues(blankArray);   // paste the blank variables into the cells to delete contents
}

return;
}




