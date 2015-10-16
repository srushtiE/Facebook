/**
 * New node file
 */
var mysql = require('./mysql');

exports.addGroup=function(req,res){
	var query1 = "insert into ?? (??,??,??) values (?,?,now())";
	var params1 = ['groupdetails_table','createdby','groupname','timestamp',req.body.userName,req.body.groupName];
	var query2 = "insert into ?? (??,??,??) values ((select ?? from ?? where ?? = ? and ?? = ?),?,now())";
	var params2 = ['groupmember_table','groupid','userid','timestamp','groupid','groupdetails_table','createdby',req.body.userName,'groupname',req.body.groupName,req.body.userName];

	mysql.fetchData(function(err, rows) {
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
	}, query1, query2, params1, params2);
};

exports.deleteGroup=function(req,res){
	var query1 = "delete from ?? where ??=(select ?? from ?? where ?? = ?)";
	var params1 = ['groupmember_table','groupid','groupid','groupdetails_table','groupname',req.body.groupName];
	var query2 = "delete from ?? where ??=?";
	var params2 = ['groupdetails_table','groupname',req.body.groupName];
	mysql.fetchData(function(err, rows) {
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("rows deleted");
			res.status(200).json({
				message : "success"
			});
		}
	}, query1, query2, params1, params2);
};

exports.addMember=function(req,res){
	var query1="insert into ?? (??,??,??,??) values ((select ?? from ?? where ??=?),?,?,now())";
	var params1=['grouprequest_table','groupid','member_requesting','status','timestamp','groupid','groupdetails_table','groupname',req.body.groupName,req.body.userName,'1'];
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
	},query1,null,params1,null);


};

exports.confirmMember=function(req,res){
	var query1 = "insert into ?? set ?? = ?, ?? = (select ?? from ?? where ?? = ?)";
	var params1 = ['groupmember_table','userid',req.body.userName,'groupid','groupid','groupdetails_table','groupname',req.body.groupName];
	var query2 = "update ?? set ?? = ? where ?? = ? ";
	var params2 = ['grouprequest_table','status','2','member_requesting',req.body.userName];
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
	},query1,query2,params1,params2);
};

exports.showMembers=function(req,res){
	var query1 = "select ?? from ?? where ?? IN (select ?? from ?? where ?? = ?)";
	var params1 = ['userid','groupmember_table','groupid','groupid','groupdetails_table','groupname',req.params.groupName];

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
	},query1,null,params1,null);
};

exports.deleteMember=function(req,res){
	var query1 = "delete from ?? where ??=(select ?? from ?? where ?? = ?) and ??=?";
	var params1 = ['groupmember_table','groupid','groupid','groupdetails_table','groupname',req.body.groupName,'userid',req.body.userName];

	mysql.fetchData(function(err,rows){
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("row deleted");
			res.status(200).json({
				message : "success",
				data : rows
			});
		}
	},query1,null,params1,null);
};

exports.showGroupList=function(req,res){
	var query1 = "select ?? from ?? where ?? IN (select ?? from ?? where ??=?)";
	var params1 =['groupname','groupdetails_table','groupid','groupid','groupmember_table','userid',req.params.userName];

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
	},query1,null,params1,null);
};
exports.getPendingRequests=function(req,res){
	var query = "select ?? from ?? where ??=? and ?? =(select ?? from ?? where ?? = ?)";
	var params = ['member_requesting','grouprequest_table','status','1','groupid','groupid','groupdetails_table','groupname',req.params.groupName];

	mysql.fetchData(function(err,rows){
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("pending requests");
			res.status(200).json({
				message : "success",
				data : rows
			});
		}
	},query,null,params,null);
};
exports.getGroupAdmin=function(req,res){
	var query ="select ?? from ?? where ??=?";
	var params = ['createdby','groupdetails_table','groupname',req.params.groupName];

	mysql.fetchData(function(err, rows) {
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			console.log("group admin");
			res.status(200).json({
				message : "success",
				data : rows
			});
		}

	}, query, null, params, null);
};