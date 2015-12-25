var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

//var connect_mongo = require('connect-mongo')(express);
var local_database_uri  = 'mongodb://steven:hello@ds053194.mongolab.com:53194/heroku_gjkl8qfv';
var database_uri = process.env.MONGOLAB_URI || local_database_uri;
mongoose.connect(database_uri);

var processLogin = require('./processing/processLogin');
var processSignUp = require('./processing/processSignUp');
var processBlog = require('./processing/processBlog');
var processPost = require('./processing/processPost');
var processDeleteBlog = require('./processing/processDeleteBlog');
var processDeletePost = require('./processing/processDeletePost');
var processSignOut = require('./processing/processSignOut');

var getRoute = require('./routes/route_list');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'login_session',
	resave: false,
  	saveUninitialized: true
}));
app.use(function(req, res, next) { res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); next(); });

app.get('/', getRoute.loginpage);
app.get('/signup', getRoute.signUpPage);
app.get('/makeBlog', getRoute.makeBlogPage);
app.get('/dashboard', getRoute.goToDash);
app.get('/blog/*', getRoute.displayBlog);
app.get('/makePost/*', getRoute.makePostPage);
app.get('/viewPost/*', getRoute.viewPostPage);
app.get('/processSignOut', processSignOut.signOut);

app.post('/processDeleteBlog', processDeleteBlog.deleteBlog);
app.post('/processDeletePost', processDeletePost.deletePost);
app.post('/processBlog', processBlog.create);
app.post('/processLogin', processLogin.authenticate);
app.post('/processSignUp', processSignUp.signup);
app.post('/processPost', processPost.createPost);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


