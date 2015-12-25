var models = require('../models');
var mongoose = require('mongoose');

exports.deletePost = function(req, res){
	var deleteURL = req.body.url;
	var blogUrl = req.body.blogUrl;
	models.Post.findOne({"Url": deleteURL}, function(err, post){
		post.remove();
	});	

	models.Blog.findOne({"Url": blogUrl}, function(err, blog){
		if(err){
				console.log("Blog was not found");
		}
		else{
			for(var i = 0; i < blog.Posts.length; i++){
				if(blog.Posts[i].Url == deleteURL){
					blog.Posts.splice(i, 1);
					break;
				}
			}

			var data = {
				"display": 'flex',
				"array": blog.Posts,
				"blogURL": blogUrl
			};

			blog.save(function(err){
				res.render('pages/blogPage', {posts: data});
			});
		}	
	});
};