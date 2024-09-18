function readAdmin(){
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();
 //Admin
let cell = setupCell("Dashboard","B5")
let sheet = setupSheet("Admin")
 
 var results = stmt.executeQuery('select distinct order_id, db.`first_name`, db.`last_name`, `nickname` fbname, `admin-phone-number`, `admin-participation-statement-one`, `admin-participation-statement-two`   from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND status="wc-processing" order by db.`first_name` ASC');

appendToSheet(sheet, results);
results.close();
stmt.close();
}
