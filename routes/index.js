
exports.views = function(req,res){
	res.render('index',{
		title : 'My Facebook'
	});
};

exports.signUp = function(req,res){
	res.render('templates/addUser',{
		title : 'My Facebook'
	});
};

exports.logIn = function(req,res){
	res.render('templates/home',{
		title: 'My Facebook'
	});
};

exports.logout = function(req,res){
	res.render('templates/addUser',{
		title: 'My Facebook'
	});
};