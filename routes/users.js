var mysql = require('./mysql');

exports.requireLogin = function(callback,req){
	
	var query = "select 1 from session_table where userid = '" + req.session.user + "'";
	var json_response;
	
	mysql.fetchData(function(err,results){
		if(err){
			console.log("ERROR: " + err.message);
			json_response = { 'value' : 2 }; //2 denotes error
			callback(json_response);
		} else {
			if(results.length > 0){
				json_response = { 'value' : 1 }; // 1 denotes success scenario
				callback(json_response);
			}
			else {   
				json_response = { 'value' : 0 };
				callback(json_response);//0 denotes no such session exists
			}
		}
	},query,null);
	};

exports.createSession = function(req){
	var query="insert into session_table values ('"+req.body.userName+"',now())";
	console.log("Query: "+query);
	
	mysql.fetchData(function(err,results){
		if(err){
			console.log("error occurred");
		}else{
			console.log("row inserted");
		}
	},query,null);

};
/*exports.checkSession = function(callback,req,res){
	var query = "select 1 from session_table where userid='"+req.body.userName+"'";
	console.log("Query: "+query);

	mysql.fetchData(function(err, rows) {
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
			callback(res);
		}else{
			console.log("row inserted");
			res.status(200).json({
				message : "success"
			});
			callback(res);
		}
	}, query, null);
};*/


exports.signUp = function(req,res){
	
	//createSession(req);
	
	var query="insert into ?? values (?,now())";
	var params = ['session_table',req.body.userName];
	console.log("Query: "+query);
	
	mysql.fetchData(function(err,results){
		if(err){
			console.log("error occurred");
		}else{
			console.log("row inserted");
		}
	},query,null,params,null);
	
	console.log(req.body);
	var query1 = "insert into ?? values (?,?)";
	var params1 = ['user_table',req.body.userName,req.body.password];
	console.log("Query1 :" + query1);
	var query2 = "insert into ?? values (?,?,?,STR_TO_DATE(?,'%m/%d/%Y'),?,now())";
	var params2 = ['userdetails_table',req.body.userName,req.body.fName,req.body.lName,req.body.dob,req.body.gender];
	console.log("Query2 :" + query2);

	mysql.fetchData(function(err,results,flag){
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			if(flag){
				req.session.user = req.body.userName;
				console.log("row inserted");
				res.status(200).json({
					message : "success"
				});
			}
		}
	},query1,query2,params1,params2);

};

exports.logIn = function(req,res){
	//var query1 = "select * from ?? where ?? = ? and ?? = ?";
	var query1 = "select ?? from ?? as ud,?? as u where ?? = ? and ?? = ? and ?? = ??";
	var params1 = ['fname','userdetails_table','user_table','u.userid',req.body.userName,'u.password',req.body.password,'ud.userid','u.userid' ];
	var query2 = "insert into ?? values (?,now())";
	var params2 = ['session_table',req.body.userName];
	
	var query = "select "
	console.log("Query :" + query1);
	
	mysql.fetchData(function(err,rows,flag) {
		console.log(rows);
		if(err){
			console.log("error occurred");
			res.status(500).json({
				status : 500,
				message : "error"
			});
		}else{
			if(rows.length>0 || flag){
				/*console.log(rows);*/
				var userFName = rows[0];
				
				mysql.fetchData(function(err,rows,flag){
					if(err){
						console.log("error occurred");
						res.status(500).json({
							status : 500,
							message : "error"
						});
					}else{
						req.session.user = req.body.userName;
						console.log("in users.js logIn line:87");
						res.status(200).json({
							data : userFName
						});
					}
				},query2,null,params2,null);
				
			}else{
				res.status(403).json({
					status : 403,
					message : "Invalid Credentials"
				});
			}
		}
	}, query1,null,params1,null);
};

exports.logOut = function(req,res){
	var query = "delete from ?? where ?? = ?";
	var params = ['session_table','userid',req.session.user];
	console.log("Query: " + query);
	
	mysql.fetchData(function(err, rows) {
		if(err){
			console.log("error occurred");
			res.status(500).json({
				message : "error"
			});
		}else{
			req.session.destroy();
			console.log("session destroyed");
			res.status(200).json({
				message : "success"
			});
		}
	}, query,null,params,null);
};