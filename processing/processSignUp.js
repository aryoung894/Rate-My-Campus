// Page to sign up for an account


var models = require('../models');

exports.signup = function(req, res){
	var form_data = req.body;
  	console.log(form_data);

  	// make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  var newPost = new models.Project({
    "email": form_data.email,
    "password": form_data.password
  });

  models.Project
    .find({"email": newPost.email})
    .exec(unique);

    function unique(err, isUnique){
       if(typeof(isUnique[0]) == 'undefined'){
        newPost.save(saving);
          console.log("**************Case 1");
       }
          
       else{
        res.render('pages/signup', {errMsg: "Email exists already. Please enter another one."});   
       }
             
    }
  

  function saving(err, newuser){
    if(err){
    	console.log(err);
      
    	res.render('pages/signup');
    }
    else if(form_data.password != form_data.confirm){
      res.render('pages/signup', {errMsg: "Password and Confirm Password do not match"}); 
    }
    else{
      
    	res.render('pages/index');
    } 
    
  }
}
