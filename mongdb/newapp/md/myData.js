
var myData = {
	insertMany:function(db,collectName,data,callback){
		var collection = db.collection(collectName);
		var data = data;
		collection.insertMany(data,(err,result)=>{
			if(err){
				console.log(err)
			}else{
				callback(result);
			}
		})
	},
	findData:function(db,collectName,data1,data2,callback){
		var collection = db.collection(collectName);
		var data1 = data1;
		var data2 = data2;
		collection.find(data1,data2).toArray((err,result)=>{
			if(err){
				console.log(err)
			}else{
				callback(result);
			}
		})
	},
	upData:function(db,collectName,data1,data2,callback){
		var collection = db.collection(collectName);
		var data1 = data1;
		var data2 = data2;
		collection.update(data1,data2,(err,result)=>{
			if(err){
				console.log(err)
			}else{
				callback(result);
			}
		})
	},
	removeData:function(db,collectName,data,callback){
		var collection = db.collection(collectName);
		collection.remove(data,(err,result)=>{
			if(err){
				console.log(err)
			}else{
				callback(result);
			}
			
		})
	}
}
module.exports = myData;