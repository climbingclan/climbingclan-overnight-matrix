function readBuddy() {
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();

let cell = setupCell("Dashboard","B5")
let sheet = setupSheet("Buddy")
 
 var results = stmt.executeQuery('select distinct `first_name` "First Name",`nickname` "FB-name", `admin-first-timer-question` "First time with Clan?",`admin-first-timer-overnight` "First overnight trip?", `stats_attendance_attended_cached`  "attended events",`stats_attendance_overnight_attended_cached`  "attended overnight trips" from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND status="wc-processing" order by `admin-first-timer-question` desc, `admin-first-timer-overnight` desc,CAST(stats_attendance_overnight_attended_cached AS UNSIGNED INTEGER) asc,CAST(stats_volunteer_for_denominator_cached AS UNSIGNED INTEGER) asc');  //console.log(results);
setTextFormat(sheet,"C2:D","No","#a9a9a9")
setColoursFormat(sheet,"C2:D","Yes","#ffd898")

appendToSheet(sheet, results);




results.close();
stmt.close();



} 