/**
 * New node file
 */

var mysql = require('./mysql');

exports.addFriend = function(req,res){
	var query = "insert into ?? values(?,?,?,now())";
	var params = ['friendrequest_table',req.body.userName,req.body.toUser,'1'];
	console.log("Query: " + query);

	mysql.fetchData(function(err,rows){
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("row inserted in addFriend");
			res.status(200).json({
				message : "success"
			});
		}
	},query,null,params,null);
};

exports.confirmFriend = function(req,res){
	var query1 = "insert into ?? values(?,?,now())";
	var params1 = ['friendslist_table',req.body.userName,req.body.withUser];
	console.log("Query1: " + query1);
	var query2 = "update ?? set ?? = ? where ?? = ? and ??=?";
	var params2 = ['friendrequest_table','status','2','request_sent_to',req.body.userName,'userid',req.body.withUser];
	console.log("Query2: " + query2);
	mysql.fetchData(function(err,rows){
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("row inserted");
			res.status(200).json({
				message : "success"
			});
		}
	},query1,query2,params1,params2);
};

exports.getFriendList = function(req,res){
	var query = "select ??,??,?? from ?? where ?? IN (select ?? as user from ?? where ??=? union select ?? as user from ?? where ??=?)";
	var params = ['fname','lname','userid','userdetails_table','userid','friends_with','friendslist_table','userid',req.params.userName,'userid','friendslist_table','friends_with',req.params.userName];
	console.log("in /api/getFriendList");
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

exports.getPendingFriendsList=function(req,res){
	var query = "select ??,??,?? from ?? where ?? IN (select ?? from ?? where ?? = ? and ?? = ?)";
	var params = ['fname','lname','userid','userdetails_table','userid','userid','friendrequest_table','request_sent_to',req.params.userName,'status','1'];
	
	mysql.fetchData(function(err, rows) {
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
	}, query, null, params, null);
};

exports.checkFriendRequest = function(req,res){
	var query = "select ??,?? from ?? where ?? = ? and ?? = ? or ?? = ? and ?? = ?";
	var params = ["status","userid","friendrequest_table","userid",req.params.user1,"request_sent_to",req.params.user2,"userid",req.params.user2,"request_sent_to",req.params.user1];
	
	mysql.fetchData(function(err, rows) {
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("row inserted");
			res.status(200).json({
				message : "success",
				data : rows[0]
			});
		}
	}, query, null, params, null);
	
	
};

exports.getAll=function(req,res){
	var query = "select ??,??,?? as item,? as id from ?? union select ??,??,?? as item,? as id from ??";
	var params = ['fname','lname','userid','1','userdetails_table','groupid','createdby','groupname','2','groupdetails_table'];
	
	mysql.fetchData(function(err, rows) {
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
	}, query, null, params, null);
};