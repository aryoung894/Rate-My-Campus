var models = require('../models');
var mongoose = require('mongoose');

exports.signOut = function(req, res){
	models.Project
		.find({"email": req.session.loginEmail})
		.exec(signOutUser)

		function signOutUser(err, user){
			req.session.logged = false;

			var err = {
				"msg": "",
				"display": 'none'
			};

			req.session.destroy(function(){
				res.render('pages/index', {errMsg: err});
			});
		}
}	