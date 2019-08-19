// gravatar icon from email
var gravatar = require('gravatar');
// load comment model
var Comments = require('../models/comments');

// comment list
exports.list = function(req,res){
  // sort comment list with date
  Comments.find().sort('-created').populate('user', 'local.email').exec(function(error, comments){
    if(error){
      return res.send(400,{
        message: error
      });
    }
    // render result
    res.render('comments', {
      title: ' Comments Page',
      comments : comments,
      gravatar : gravatar.url(comments.email, {s:'80', r:'x', d:'retro'}, true)
    });
  });
};

// write comment
exports.create = function(req,res){
  // create comment model has request body 
  var comments = new Comments(req.body);
  // set current user id
  comments.user = req.user;
  // save data
  comments.save(function(error){
    if(error){
      return res.send(400, {
        message:error
      });
    }
    // redirect to comment page
    res.redirect('/comments');
  });
};

// comment authorization middleware
exports.hasAuthorization = function(req, res, next){
  if (req.isAuthenticated())
    return ExtensionScriptApis();
    res.redirect('/login');
}