// Page to sign up for an account
var mongoose = require('mongoose');
var models = require('../models');

exports.signup = function(req, res){
	var form_data = req.body;

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  var newPost = new models.Project({
    "email": form_data.email,
    "password": form_data.password
  });

  var err = {
        "msg": "",
        "display": 'none' 
  };

  models.Project
    .find({"email": newPost.email})
    .exec(unique);

    function unique(err, isUnique){
       if(typeof(isUnique[0]) == 'undefined'){
            if(err){
                res.render('pages/signUp', {errMsg: err});
            }
            else if(form_data.password != form_data.confirm){
              err = {
                    "msg": "Password and Confirm Password do not match",
                    "display": 'block'
              };
              res.render('pages/signUp', {errMsg: err}); 
            }
            else if(form_data.password.length < 6){
                err = {
                    "msg": "Password is too short. Please make a password that is at least 6 characters long",
                    "display": 'block'
                };
                res.render('pages/signUp', {errMsg: err}); 
            }
            else{
                newPost.save(function(){
                    err = {
                        "msg": "",
                        "display": 'none' 
                    };
                    res.render('pages/index', {errMsg: err});
                });
            } 
        }
          
       else{
        err = {
            "msg": "Email exists already. Please enter another one.",
            "display": 'block'
        };

        res.render('pages/signUp', {errMsg: err});   
       }
             
    }
}
