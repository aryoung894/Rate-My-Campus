var models = require('../models');
var mongoose = require('mongoose');
var routes = require('../routes/route_list');

exports.deleteBlog = function(req, res){
	var deleteURL = req.body.url;
	models.Blog.findOne({"Url": deleteURL}, function(err, blog){
		blog.remove();
	});	

	models.Project.findOne({"email": req.session.loginEmail}, function(err, blog){
		if(err){
				console.log("Blog was not found");
		}
		else{
			for(var i = 0; i < blog.blogArray.length; i++){
				if(blog.blogArray[i].Url == deleteURL){
					blog.blogArray.splice(i, 1);
					break;
				}
			}
			blog.save(function(err){
				res.render('pages/dashboard', {blogs: blog.blogArray});
			});
		}	
	});
};