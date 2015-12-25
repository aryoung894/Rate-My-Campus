var models = require('../models');
var mongoose = require('mongoose');

exports.loginpage = function(req, res){
	res.render('pages/index');
}

exports.signUpPage = function(req, res){
	res.render('pages/signUp', { errMsg: '' });
}

exports.makeBlogPage = function(req, res){
	res.render('pages/makeBlog');
}

exports.goToDash = function(req, res){
	models.Project
		.find({"email": req.session.loginEmail})
		.exec(getBlogData);

	function getBlogData(err, emailMatch){
		res.render('pages/dashboard', {blogs: emailMatch[0].blogArray});
	}	
}

exports.displayBlog = function(req, res){
	var displayFlag;
	var url = req.params[0];
	if(req.session.logged){
		displayFlag = 'flex';
	}
	else{
		displayFlag = 'none';
	}
	models.Blog
		.find({"Url": req.params[0]})
		.exec(getPostData);

	function getPostData(err, urlMatch){
		var data = {
			"display": displayFlag,
			"array": urlMatch[0].Posts,
			"blogURL": url
		};
		res.render('pages/blogPage', {posts: data});
	}
}

exports.makePostPage = function(req, res){
	res.render('pages/makePost', {param: req.params[0]});
}

exports.viewPostPage = function(req, res){
	var displayFlag;
	if(req.session.logged){
		displayFlag = 'flex';
	}
	else{
		displayFlag = 'none';
	}

	models.Post
		.find({"Url": req.params[0]})
		.exec(getPostData)

	function getPostData(err, urlMatch){
		if(urlMatch[0] == 'undefined'){
			console.log("Not found");
			res.render('pages/viewPost');
		}
		else{	
			var data = {
				"display": displayFlag,
				"post": urlMatch[0]
			}
			res.render('pages/viewPost', {post: data});
		}
	}
}

