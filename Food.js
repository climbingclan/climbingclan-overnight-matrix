 function readFood(){
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();
 let cell = setupCell("Dashboard","B5")
 let sheet = setupSheet("Food")
 
 var results = stmt.executeQuery('select distinct db.`first_name` "First Name",`nickname` fbname, `admin-dietary-requirements` "Dietary Requirements", `admin-diet-allergies-health-extra-info` "Allergies and Health info"   from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND pd.status="wc-processing" order by FIELD(`admin-dietary-requirements`,  "none", "Strongly prefers meals include Meat or Fish","Flexible but prefers Meat", "Flexible but prefers Veggie","Flexible but prefers Veggie", "Vegetarian", "Vegan","Lactose-Intolerant","Gluten-free",  "Other", "evening_meal_washingup_marshal", "postpromo1"), `admin-dietary-requirements` ASC');

 appendToSheet(sheet, results);
 results.close();
stmt.close();
 }
