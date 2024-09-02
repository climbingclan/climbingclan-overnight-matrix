function readTransport(){

 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();

let cell = setupCell("Dashboard","B5")
let sheet = setupSheet("Transport")
 
 var results = stmt.executeQuery('select `first_name` "First Name",`nickname` "FBName", `transport-need-lift` "Need lift", `transport-will-you-give-lift` "Will Give Lift", `transport-leaving-location` "Leaving Location", `transport-depature-time` "Leaving Time" from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND status="wc-processing" order by `transport-need-lift` ASC,`transport-will-you-give-lift`,order_created Desc ');
setTextFormat(sheet,"C2:C","No","#a9a9a9")
setColoursFormat(sheet,"C2:C","Yes","#ffd898")


appendToSheet(sheet, results);
results.close();
stmt.close();
}