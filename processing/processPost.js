var models = require('../models');
var mongoose = require('mongoose');
var Model = mongoose.model('Project', models.ProjectSchema);
var blogModel = mongoose.model('Blog', models.BlogSchema);
var postModel = mongoose.model('Post', models.postSchema);

exports.createPost = function(req, res){
	var index;
	var postInfo = req.body;
	var userID = req.session.loginEmail;
	var d = new Date();
	var dateNum = d.getDate();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = month + "/" + dateNum + "/" + year;
	var uniqueURL = guid();
	function guid() {
  		function s4() {
    		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  		}
  		return s4();
	}

	// For public access for blogs
	blogModel.findOne({Url: postInfo.blogUrl}, function(err, blog){
       var postJson2 = {
				"Title": postInfo.title,
				"Date": date,
				"Content": postInfo.textEdit,
				"Url": uniqueURL
		};
		if(blog.Posts.length == 0){
			index = 0;
		}
		else{
			for(var i = 0; i < blog.Posts.length; i++){
				if(blog.Posts[i] == 'undefined'){
					index = i;
					break;
				}
			}
		}
		
		blog.Posts.addToSet(postJson2);
		blog.save(function(err){

		});	
    });

	// Public access for posts
	var postJson3 = new models.Post({
				"Title": postInfo.title,
				"Date": date,
				"Content": postInfo.textEdit,
				"Url": uniqueURL
	});
	postJson3.save(saving);
    
    function saving(err){

    }   

	// For private access
	Model.findOne({email: userID}, function(err, user){
		if(err){
			res.render('pages/dashboard');
		}
		else{
			var postJson = {
				"Title": postInfo.title,
				"Date": date,
				"Content": postInfo.textEdit,
				"Url": uniqueURL
			};
			
			for(var i = 0; i < user.blogArray.length; i++){
				if(postInfo.blogUrl == user.blogArray[i].Url){
					index = i;
					break;
				}
			}
			user.blogArray[index].Posts.addToSet(postJson);
			user.save(function(err){
				if(err){
					console.log("Was not able to add");
				}
				else{
					console.log(user.blogArray[index].Posts[0]);
					res.render('pages/dashboard', {blogs: user.blogArray});
				}
			});
		}	
	});
}
	