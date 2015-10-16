var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
//var session = require('express-session'); 
var mysql = require('./routes/mysql');
var routes = require('./routes/index');
var users = require('./routes/users');
var friends = require('./routes/friends');
var groups = require('./routes/groups');
var overview = require('./routes/overview');
var newsfeeds = require('./routes/newsfeeds');
var interests = require('./routes/interests');
var http = require('http');
var path = require('path');
var app = express();

mysql.createConnPool();
//session
app.use(session({
	cookieName: 'session',
	secret : 'sjsu010726287',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
})); 

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon1.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware to validate session
function checkSession(req, res, next) { 	
	console.log(" in server.js : " + req.session.user);
	
	if(req.session.user){
		users.requireLogin(function(resp){
			console.log("resp " + JSON.stringify(resp, null, 4));
			if(resp.value==1){
				next();
			}
			else{
				res.redirect('/');
			}
		},req);
	}
	else{
		res.redirect('/');
	}
} 

/*app.use(function(req, res, next) {
	if (req.session && req.session.userName) {
		users.checkSession(function(err, user) {
			if (user) {
				req.user = user;
				req.session.userName = user;  //refresh the session value
			}
			// finishing processing the middleware and run the route
			next();
		},req,res);
	} else {
		console.log("in else after checkSession");
		next();
	}
});

function requireLogin (req, res, next) {
	if (!req.user) {
		res.redirect('/');
	} else {
		next();
	}
};
*/


app.get('/templates/:file', routes.signUp);
app.get('/addUser',routes.signUp);
app.get('/logout',routes.logout);
app.get('/home',checkSession,routes.logIn);
app.post('/api/signUp',users.signUp);
app.post('/api/logIn',users.logIn);
app.post('/api/logOut',users.logOut);
app.post('/api/addFriend',friends.addFriend);
app.post('/api/confirmFriend',friends.confirmFriend);
app.get('/api/getFriendList/:userName',friends.getFriendList);
app.get('/api/getPendingFriendsList/:userName',friends.getPendingFriendsList);
app.get('/api/getAll',friends.getAll);
app.post('/api/addGroup',groups.addGroup);
app.post('/api/deleteGroup',groups.deleteGroup);
app.post('/api/addMember',groups.addMember);
app.post('/api/confirmMember',groups.confirmMember);
app.post('/api/deleteMember',groups.deleteMember);
app.get('/api/showMembers/:groupName',groups.showMembers);
app.get('/api/showGroupList/:userName',groups.showGroupList);
app.get('/api/getGroupAdmin/:groupName',groups.getGroupAdmin);
app.get('/api/getPendingRequests/:groupName',groups.getPendingRequests);
app.post('/api/addOverviewDetails',overview.addOverviewDetails);
app.get('/api/showOverview/:userName',overview.showOverview);
app.get('/api/showOverviewDetails/:userName/:ovid',overview.showOverviewDetails);
app.post('/api/postNewsFeeds',newsfeeds.postNewsFeeds);
app.get('/api/getNewsFeeds/:userName',newsfeeds.getNewsFeeds);
app.get('/api/getInterests/:category',interests.getInterests);
app.get('/api/getUserInterests/:userName',interests.getUserInterests);
app.post('/api/addUserInterests/:userName',interests.addUserInterests);
app.get('/api/checkFriendRequest/:user1/:user2',friends.checkFriendRequest);
app.use('/', routes.views);

//app.use('/users', users);



//catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


//error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
