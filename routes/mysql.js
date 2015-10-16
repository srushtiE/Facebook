/**
 * New node file
 */
var ejs= require('ejs');
var mysql = require('mysql');

var dbPool={
		"maxSize" :50
};

var pool = [];

function getConnection(){
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'test',
		port	 : 3306
	});
	return connection;
}

exports.createConnPool = function (){
	for(var i=0;i<dbPool.maxSize;i++){
		pool.push(getConnection());
	}
};

function getConnFromPool(){
	if(pool.length<=0){
		console.log("Pool is Empty, no connections available");
		return null;
	}else{
		return pool.pop();
	}
}

function fetchData(callback,sqlQuery1,sqlQuery2,sqlParams1,sqlParams2){

	var connection=getConnFromPool();
	if(connection){
		console.log("Connection recvd");
	}else{
		console.log("Connection not recvd");
	}
	
	var query1 = mysql.format(sqlQuery1,sqlParams1);
	console.log("\nSQL Query1:"+query1);
	connection.beginTransaction(function(err){
		if(err){
			console.log("ERROR1: " + err.message);
			callback(err,null,null);
		}else{
			connection.query(query1,function(err,rows){
				console.log("inside beginTransaction else1 line:37");
				if(err){
					connection.rollback(function(){
						console.log("ERROR2: " + err.message);
						callback(err,null,null);
					});
				}else{
					console.log("rows.affectedRows>0");
					if((rows.affectedRows && rows.affectedRows>0) || rows.length>0){
						console.log("rows.affectedRows>0 line:43");
						if(sqlQuery2){
							var query2 = mysql.format(sqlQuery2,sqlParams2);
							console.log("\nSQL Query2:"+query2);
							connection.query(query2,function(err,rows){
								if(err){
									connection.rollback(function(){
										console.log("ERROR3: " + err.message);
									});
									callback(err,null,null);
								}else{
									if(rows.affectedRows>0 || rows.length>0){
										connection.commit(function(err){
											if(err){
												connection.rollback(function(){
													console.log("ERROR4: " + err.message);
												});
												callback(err,null,null);
											}else{
												//connection.end();
												var flag = 1;
												callback(null,rows,flag);
											}
											pool.push(connection);
										});
									}
								}
								//pool.push(connection);
							});
						}else{
							console.log("before commit line:66");
							connection.commit(function(err){
								if(err){
									connection.rollback(function(){
										console.log("ERROR5: " + err.message);
									});
									callback(err,null,null);
								}else{
									//connection.end();
									var flag = 1;
									callback(null,rows,flag);
								}
								pool.push(connection);
							})
						}
					}else{
						console.log("cannot get values for rows.affectedRows>0 || rows.length>0")
						if(rows.length==0){
							callback(null,rows,null);
						}else{
							callback("error",null,null);
						}
					}
				}
				//pool.push(connection);
			});
		}
	});

	/*connection.query(sqlQuery, function(err, rows) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(null , rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();*/
}


exports.fetchDataSingle = function(callback,sqlQuery,sqlParams){
	
	var connection=getConnFromPool();
	if(connection){
		console.log("Connection recvd");
	}else{
		console.log("Connection not recvd");
	}
	
	var query = mysql.format(sqlQuery,sqlParams);
	connection.query(query, function(err, rows) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err , null,0);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(null , rows,1);
		}
	});
	pool.push(connection);
};

exports.fetchData=fetchData;