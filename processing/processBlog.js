var models = require('../models');
var mongoose = require('mongoose');
var Model = mongoose.model('Project', models.ProjectSchema);
var blogModel = mongoose.model('Blog', models.BlogSchema);

exports.create = function(req, res){
	var blogInfo = req.body;
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
  		return s4() + s4();
	}

	// For public access
	var blogSchema = new models.Blog({
		"Title": blogInfo.title,
		"Date": date,
		"Category": blogInfo.category,
		"Description": blogInfo.description,
		"Posts": [],
		"Url": uniqueURL
	});

	models.Blog
    .find({"Url": uniqueURL})
    .exec(unique);

    function unique(err, isUnique){
       if(typeof(isUnique[0]) == 'undefined'){
       	console.log("does it save");
        blogSchema.save(saving);
       }
    }

    function saving(err, newuser){
    	
    
  	}   

  	// For private access
	Model.findOne({email: userID}, function(err, user){
		if(err){
			res.render('pages/makeBlog', {errMsg: "Error occurred"});
		}
		else{
			console.log(user.email);
			var blogJson = {
				"Title": blogInfo.title,
				"Date": date,
				"Category": blogInfo.category,
				"Description": blogInfo.description,
				"Posts": [],
				"Url": uniqueURL
			};
			user.blogArray.addToSet(blogJson);
			user.save(function(err){
				if(err){
					console.log("Was not able to add");
				}
				else{
					console.log("add successfull");
					res.render('pages/dashboard', {blogs: user.blogArray});
				}
			});
		}
	});
}