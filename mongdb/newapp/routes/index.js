var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/yiguo";
var myData = require('./../md/myData.js');
/* GET home page. */


//router.get('/', function(req, res, next) {
//res.render('index', { title: 'Express' });
//});



router.get('/', function(req, res, next) {
	MongoClient.connect(DB_CONN_STR,(err,db)=>{
		if(err){
			console.log(err);
		}else{
			console.log("数据连接成功");
			res.send('<h1>链接数据库成功</h1>')
			// myData.findData(db,"home",{},{"name":1,"_id":0},function(result){
			// 	res.send(result);
			// 	db.close();
			// })
		}
	})
});
module.exports = router;
