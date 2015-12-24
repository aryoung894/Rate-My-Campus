var models = require('../models');
var mongoose = require('mongoose');

exports.authenticate = function(req, res){
	var userInput = req.body;
	var newArr = [];
	req.session.loginEmail = userInput.email;
	
	var Model = mongoose.model('Project', models.ProjectSchema);
	models.Project
		.find({"email": userInput.email})
		.exec(testMatchingEmail);

	function testMatchingEmail(err, emailMatch){
		if((typeof(emailMatch[0]) == 'undefined') || err){
			res.render('pages/index', {errMsg: "Wrong information or signup"});
			console.log("Error");
		}
		else{
			if((emailMatch[0].email == (""+userInput.email)) && (emailMatch[0].password == (""+userInput.password))){
				req.session.logged = true;
				res.render('pages/dashboard', {blogs: emailMatch[0].blogArray});
			}	
		}	
	}
}