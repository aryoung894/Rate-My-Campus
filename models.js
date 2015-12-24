var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	"Title": String,
	"Date": String,	
	"Content": String,
	"Url": String	

});

var BlogSchema = new mongoose.Schema({
	"Title": String,
	"Date": String,
	"Category": String,
	"Description": String,
	"Posts": [postSchema],
	"Url": String
});

var ProjectSchema = new mongoose.Schema({
	"password": String,
	"email": String,
	"blogArray": [BlogSchema] 
});

exports.Project = mongoose.model('Project', ProjectSchema);


exports.Blog = mongoose.model('Blog', BlogSchema);

exports.Post = mongoose.model('Post', postSchema);
