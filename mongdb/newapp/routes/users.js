var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/yiguo";
var myData = require("./../md/myData.js");
var url = require('url');
/* GET users listing. */
router.get('/', function(req, res, next) {
//	res.send('respond with a resource');
});
//注册功能---------------------------------------------------------------------------------
router.get('/register', function(req, res, next) {
	
//console.log(url.parse(req.url,true).query);
  var userObj = url.parse(req.url,true).query;
	MongoClient.connect(DB_CONN_STR,(err,db)=>{
		if(err){
			console.log(err);
		}else{
			console.log('数据链接连接成功');
			myData.findData(db,'user',{"name":userObj.userName},{"name":1,"_id":0},function(result){
				if(result.length != 0){
					res.send("该用户名已存在")
				}else{
					console.log("查询数据完毕，插入数据开始")
					var data = [{"name":userObj.userName,"pwd":userObj.userPwd}];
					myData.insertMany(db,'user',data,function(result){
						console.log("添加用户成功")
						res.send('注册成功');
					})
				}
			})
		}
	})
});
//登录功能---------------------------------------------------------------------------------
router.get('/login', function(req, res, next) {
	
  var userObj = url.parse(req.url,true).query;
	MongoClient.connect(DB_CONN_STR,(err,db)=>{
		if(err){
			console.log(err);
		}else{
			console.log('数据链接连接成功');
			var data1 = {"name":userObj.userName,"pwd":userObj.userPwd};
			var data2 = {"name":1,"_id":0}
			myData.findData(db,'user',{"name":userObj.userName},data2,function(result){
				if(result.length == 1){
					myData.findData(db,'user',data1,data2,function(result){
						if(result.length == 1){
							res.send("登陆成功");
						}else{
							res.send("密码错误");
						}
					})
				}else{
					res.send("该账号不存在");
				}
			})
		}
	})
});
//找回密码功能----------------------------------------------------------------------------------
router.get('/back', function(req, res, next) {
  var userObj = url.parse(req.url,true).query;
	MongoClient.connect(DB_CONN_STR,(err,db)=>{
		var data1 = {"name":userObj.userName,"pwd":userObj.userPwd};
		var data2 = {"name":1,"_id":0};
		var data3 = {$set:{"pwd":userObj.newPwd}};
		if(err){
			console.log(err);
		}else{
			console.log('数据链接连接成功');
			myData.findData(db,'user',data1,data2,function(result){
				console.log(result.length);
				if(result.length == 1){
					myData.upData(db,'user',data1,data3,function(result){
						res.send("更改密码成功");
					})
				}else{
					res.send("账号密码错误或该用户不存在")
				}
			})
		}
	})
});


module.exports = router;
