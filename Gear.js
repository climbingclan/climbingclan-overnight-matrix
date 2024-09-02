function readGear(){
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();

 //Gear
let cell = setupCell("Dashboard","B5")
let sheet = setupSheet("Gear")
 
 var results = stmt.executeQuery('select distinct `first_name` "First Name",`nickname` "FB Name", `climbing-walking-or-climbing-preference-weekend` "Preferences", `climbing-discipline-preference` "S or T", gear_bringing_rack AS `Rack?`,gear_bringing_rope AS `Rope?`,gear_bringing_personal_gear AS `Personal Gear?`,  gear_bringing_waterproof_jacket "Waterproof Jacket", gear_bringing_waterproof_trousers "Waterproof Trousers",gear_bringing_boots "Boots", gear_bringing_firstaidkit "First Aid Kit",gear_bringing_guidebook "Guidebook" , gear_bringing_navigation "Nav kit", `gear-bringing-evening-or-day-trip` "Gear",gear_bringing_quickdraws AS `Quickdraws?`,`gear-walking-equipment-weekend` "Walking Gear" from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id JOIN wp_member_db_gear ge on db.id = ge.id where product_id=' + cell + '  AND status="wc-processing" order by gear_bringing_rack desc,gear_bringing_rope desc, `skills-trad-climbing` ASC');
setColoursFormat(sheet,"g2:j","No","#ffd898")
setTextFormat(sheet,"D2:F","No","#a9a9a9")
setTextFormat(sheet,"k2:Z","No","#a9a9a9")


 appendToSheet(sheet, results);
results.close();
stmt.close();
}