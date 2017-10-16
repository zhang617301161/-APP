import fetchJsonp from "fetch-jsonp";
export default {
	zeptoAjax(obj,callback){
		$.ajax({
			type:"get",
			url:obj.url,
			data:obj.data,
			dataType:obj.dataType,
			success:function(data){
				callback(data)
			}
		})
	},
	ajaxPost(obj,callback){
		$.ajax({
			type:'post',
			url:obj.url,
			data:obj.data,
			dataType:obj.dataType,
			success:function(data){
				callback(data)
			}
		})
	},
	fetch(url,successCallback,failCallBack){
		fetch(url).then(function(response) {
		  return response.json();
		}).then(function(data) {
			//成功的回调
		  successCallback(data)
		}).catch(function(e) {
			//失败
		  failCallBack(e)
		});
	},
	fetchJsonp(url,successCallback,failCallBack){
		fetchJsonp(url).then(function(response) {
		  return response.json();
		}).then(function(data) {
			//成功的回调
		  successCallback(data)
		}).catch(function(e) {
			//失败
		  failCallBack(e)
		});
	},
	fetchPost(url,obj,successCallback,failCallBack){
		fetch(url,{method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset = utf-8'}, body: obj}).then(function(response) {
		  return response.json();
		}).then(function(data) {
			//成功的回调
		  successCallback(data)
		}).catch(function(err) {
			//失败
		  failCallBack(err)
		});
	},
	fetchJsonpPost(url,obj,successCallback,failCallBack){
		fetchJsonp(url,{method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset = utf-8'}, body: obj}).then(function(response) {
		  return response.json();
		}).then(function(data) {
			//成功的回调
		  successCallback(data)
		}).catch(function(e) {
			//失败
		  failCallBack(e)
		});
	}
}
