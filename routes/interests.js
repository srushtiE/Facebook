/**
 * New node file
 */
var mysql = require('./mysql');
exports.getInterests=function(req,res){
	var query = "select * from ?? where ?? = ?";
	var params = ['interests_table','category',req.params.category];
	
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

exports.getUserInterests=function(req,res){
	var query = "select * from ?? where ?? = ?";
	var params = ['userinterest_table','userid',req.params.userName];
	
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

exports.addUserInterests=function(req,res){
	var query = "insert into ?? (??,??,??,??) values(?,?,?,?)";
	var params = ['userinterest_table','category','name','label','userid',req.body.category,req.body.name,req.body.label,req.body.userName];
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