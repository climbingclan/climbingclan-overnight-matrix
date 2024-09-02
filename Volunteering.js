function volunteerData() {
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();

let cell = setupCell("Dashboard","B5")
let sheet = setupSheet("Volunteering")

 var results = stmt.executeQuery('select `first_name` "First Name",`nickname` "Facebook Name",pd.cc_volunteer "Selected Roles",volunteer_overnight_preevent_facebook_promo "FB promo", volunteer_overnight_event_reporter "Rprtr", volunteer_overnight_head_chef "Head-Chef", volunteer_overnight_evening_meal_chef "EM Chef", volunteer_overnight_breakfast_lunch_chef "B&L Chef", volunteer_overnight_packed_lunch_marshal "Lnch Mrshl", volunteer_overnight_breakfast_marshal "Brk Mrshl",volunteer_overnight_lift_sharing_coordinator "Lift Shre", volunteer_overnight_activities_coordinator "Actvts Cood", volunteer_overnight_kit_coordinator "Kit Cood", volunteer_overnight_newbie_buddy_maker "newbie",volunteer_overnight_covid_marshal "covid mrshl",volunteer_overnight_evening_meal_washing_up_marshal "EM Wash Up",volunteer_overnight_breakfast_washing_up_marshal "B&L Wash Up",volunteer_overnight_event_assistant "Event Assist",volunteer_overnight_event_director "Trip Director",  scores_volunteer_score_cached "Receptiveness",`admin-first-timer-question` "First time with Clan?",`admin-first-timer-overnight` "First overnight trip?", `stats_volunteer_for_denominator_cached`  "attended events",`stats_attendance_overnight_attended_cached`  "attended overnight trips", `admin-weekend-requests-notes` as `Requests and notes`, pd.order_id "Order ID", pd.user_id "User ID" from wp_member_db db JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id join wp_member_db_volunteering vl on pd.user_id = vl.id where product_id=' + cell + '  AND status in ("wc-processing", "wc-onhold", "wc-on-hold")  order by FIELD(pd.cc_volunteer,  "none", "trip_director","buddy_coordinator", "kit_coordinator","transport_coordinator", "lunch_breakfast_chef", "evening_meal_chef", "breakfast_marshal", "lunch_marshal","climbing_coordinator", "evening_meal_washingup_marshal", "postpromo1") asc,`admin-first-timer-overnight` desc,CAST(stats_attendance_overnight_attended_cached AS UNSIGNED INTEGER) asc')

setNumberFormat(sheet, "t2:t1000", "0");
setColoursFormatLessThanOrEqualTo(sheet, "t2:t1000","10","#ff75d8")
setColoursFormatLessThanOrEqualTo(sheet, "t2:t1000","20","#ffd898")
setColoursFormatLessThanOrEqualTo(sheet, "t2:t1000","30","#fad02c")
setColoursFormat(sheet, "C2:C1000","none","#DAF7A6 ")
setColoursFormat(sheet, "C2:C1000","Selected","#FFFFFF")
setColoursFormat(sheet, "C2:C1000","","#e0ffff")
setTextFormat(sheet,"D2:V1000","No","#a9a9a9")
setColoursFormat(sheet,"U2:V1000","Yes","#ffd898")

sheet.setColumnWidth(25, 300);
sheet.setColumnWidth(1, 150);
setWrapped(sheet,"y2:y1000");
setColoursFormat(sheet, "C2:C1000","none","#DAF7A6 ")

appendToSheet(sheet, results);


} 

