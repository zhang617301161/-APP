var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/yiguo";
var myData = require('./../md/myData.js');
var url = require('url');
/* GET home page. */


//router.get('/', function(req, res, next) {
//res.render('index', { title: 'Express' });
//});


//添加添加或者更改商品数量
router.get('/add', function(req, res, next) {
//console.log(url.parse(req.url,true).query);
    var shopObj = url.parse(req.url,true).query;
    
    MongoClient.connect(DB_CONN_STR,(err,db)=>{
        
        if(err){
            console.log(err);
        }else{
            console.log('数据链接连接成功');
            var data1 = [{"name":shopObj.userName,"shopId":shopObj.id,"shopnum":shopObj.num,"shopname":shopObj.name,"shopJG":shopObj.price,"shopImg":shopObj.img}]
            var data2 = {"name":shopObj.userName,"shopId":shopObj.id}
            var data3 = {$set:{"shopnum":shopObj.num}}
            myData.findData(db,'cart',data2,{"name":1,"_id":0},function(result){
                console.log(result.length)
                if(result.length != 0){
                    console.log("查询数据完毕，更新数据开始");
                    myData.upData(db,'cart',data2,data3,function(result){
                        console.log('插入数据成功');
                        res.send(result);
                    })
                }else{
                    console.log("查询数据完毕，插入数据开始")
                    myData.insertMany(db,'cart',data1,function(result){
                        console.log("添加商品成功")
                        res.send('添加商品成功');
                    })
                }
            })
        }
    })

});
//删除商品
router.get('/remove', function(req, res, next) {
    
    var shopObj = url.parse(req.url,true).query;
    MongoClient.connect(DB_CONN_STR,(err,db)=>{
        if(err){
            console.log('111',err);
        }else{
            console.log('数据链接连接成功');
            var data1 = {"name":shopObj.userName,"shopId":shopObj.id};
            var data2 = {"name":1,"_id":0}
            myData.findData(db,'cart',data1,data2,function(result){
                if(result.length == 1){
                    myData.removeData(db,'cart',data1,function(result){
                        res.send('该商品已经删除')
                    })
                }else{
                    res.send("该商品不存在");
                }
            })
        }
    })
});
//获取商品列表Inquire
router.get('/inquire', function(req, res, next) {
    var shopObj = url.parse(req.url,true).query;
    MongoClient.connect(DB_CONN_STR,(err,db)=>{
        if(err){
            console.log(err);
        }else{
            console.log('数据链接连接成功');
            myData.findData(db,'cart',{"name":shopObj.userName},{},function(result){
                res.send(result)
            })
        }
    })
});

//更改商品数量-----------------------------------------------------------------------------------
router.get('/change', function(req, res, next) {
//console.log(url.parse(req.url,true).query);
    var shopObj = url.parse(req.url,true).query;
    
    MongoClient.connect(DB_CONN_STR,(err,db)=>{
        if(err){
            console.log(err);
        }else{
            console.log('数据链接连接成功');
            var data2 = {"name":shopObj.userName,"shopId":shopObj.id}
            var data3 = {$set:{"shopnum":shopObj.num}} 
            myData.upData(db,'cart',data2,data3,function(result){
                console.log('插入数据成功');
                res.send(result);
            })
        }
    })

});
module.exports = router;
