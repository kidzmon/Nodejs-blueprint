var express = require('express');
var router = express.Router();
// passport module
var passport = require('passport');
// garavtar icon from email
var gravatar = require('gravatar');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express from server folder'
  });
});

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Login Page',
    message: req.flash('loginMessage')
  });
})

/* GET Signup page. */
router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: 'Signup Page',
    message: req.flash('signupMessage')
  });
})

/* GET Profile page. */
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile', {
    title: 'Profile Page',
    user: req.user,
    avatar: gravatar.url(req.user.email, {
      s: '100',
      r: 'x',
      d: 'retro'
    }, true)
  });
});

/* POST login page. */
router.post('/login', passport.authenticate('local-login',{
  // success : profile, failure : login
  sucessRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

/* Post Singup page. */
router.post('/singup', passport.authenticate('local-signup', {
  // success : profile, failure : Singup
  successRedirect: '/profile',
  failureRedirect : '/signup',
  failureFlash: true
}));

/* Get Logout page. */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})

module.exports = router;

/* check user login*/
function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
    return next();
  res.redirect('/login');
}