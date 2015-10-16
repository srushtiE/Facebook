/**
 * New node file
 */
var mysql = require('./mysql');

exports.postNewsFeeds=function(req,res){
	var query = "insert into ?? values (?,?,now())";
	var params = ['newsfeed_table',req.body.userName,req.body.newsFeed];

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

exports.getNewsFeeds=function(req,res){
	var query = "select ?? as feeds,??,?? from ?? where ??=? union (select ?? as feeds,??,?? from ?? where ?? IN (select ?? as user from ?? where ??=? union select ?? as user from ?? where ??=?)) order by ?? desc";
	var params = ['newsfeeds','timestamp','userid','newsfeed_table','userid',req.params.userName,'newsfeeds','timestamp','userid','newsfeed_table','userid','userid','friendslist_table','friends_with',req.params.userName,'friends_with','friendslist_table','userid',req.params.userName,'timestamp'];

	mysql.fetchData(function(err,rows){
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("data");
			res.status(200).json({
				message : "success",
				data : rows
			});
		}
	},query,null,params,null);
};