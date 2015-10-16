/**
 * New node file
 */
var mysql = require('./mysql');
exports.addOverviewDetails=function(req,res){
	var query = "insert into ?? values (?,?,?,now())";
	var params = ['overview_table',req.body.ovid,req.body.userName,req.body.info];
	
	mysql.fetchData(function(err,rows){
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("row inserted");
			res.status(200).json({
				message : "success",
				data : rows
			});
		}
	},query,null,params,null);
};

exports.showOverview=function(req,res){
	var query = "select ??,?? from ?? where ??=?";
	var params = ['ovid','info','overview_table','userid',req.params.userName];
	
	mysql.fetchData(function(err,rows){
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("values");
			res.status(200).json({
				message : "success",
				data : rows
			});
		}
	},query,null,params,null);
};

exports.showOverviewDetails=function(req,res){
	var query = "select ??,?? from ?? where ??=? and ??=?";
	var params = ['info','ovid','overview_table','ovid',req.params.ovid,'userid',req.params.userName];
	mysql.fetchData(function(err,rows){
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("values");
			res.status(200).json({
				message : "success",
				data : rows
			});
		}
	},query,null,params,null);
};