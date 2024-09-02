var server = '18.168.242.164';
var port = 3306;
var dbName = 'bitnami_wordpress';
var username = 'gsheets';
var password = 'eyai4yohF4uX8eeP7phoob';
var url = 'jdbc:mysql://'+server+':'+port+'/'+dbName;
var volcol = 26;
var apidomain="climbingclan.com"
var apiusername="ck_3f8cd172e7aed36533d434e04e8c0b2affe19075"
var apipassword="cs_817f3cd22ae28bc33fa716a6fdfd707188c0409b"


function readData() {
 volunteerData();
 readFood();
 readGear();
 readTransport();
 readBuddy();
 readTradSkills();
 readSportSkills();
 readSportSkillShare();
 readTradSkillShare();
 readEvents();
 badgesData();
 readAdmin();
 readGrades();
} 

