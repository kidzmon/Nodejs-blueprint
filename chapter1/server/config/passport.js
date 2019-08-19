// load passport module
var LocalStrategy = require('passport-local').Strategy;
// load user model
var User = require('../models/users');

module.exports =function(passport){
  // passport initialize
  // serialize user
  passport.serializeUser(function(ser, done){
    done(null, user.id);
  });
  // deserialize user
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });
  // local strategy
  passport.use('local-login', new LocalStrategy({
    // username and password to 'email' and 'password'
    usernameField: 'email',
    passwordField : 'password',
    passReqToCallback:true
  },
  function(req, email,password,done){
    if(email)
    // lowercase
    email = email.toLowerCase();
    // Asyncronize
    process.nextTick(function(){
      User.findOne({ 'local.email' : email}, function(err, user){
        // error
        if(err)
          return done(err);
        // error message
        if (!user)
          return done(null, false, req.flash('lgoinMessage', 'No user found.'));
        if (!user.validPassword(password))
          return done(null,false, req.flash('loginMessage', 'Wohh! Wrong password.'));
        // user
        else
          return done(null,user);
      });
    });
  }));
  // register local strategy
  passport.use('local-signup', new LocalStrategy({
    // username and password to 'email' and 'password'
    usernameField : 'email',
    passwordField:'password',
    passReqToCallback: true
  },
  function(req, email, password,done){
    if (email)
    // Lowercase
    email = email.toLowerCase();
    //Asyncronize
    process.nextTick(function(){
      // not login yet
      if(!req.user){
        User.findOne({ 'local.email' : email }, function(err, user){
          // error
          if(err)
            return done(err);
          // email overlap
          if(user){
            return done(null, false, req.flash('signupMessage', 'Wohh! the email is already taken'));
          } else{
            // create user
            var newUser = new User();
            // bring username from req.body
            newUser.local.name = req.body.name;
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            //store data
            newUser.save(function(err){
              if(err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      } else{
        return done(null, req.user);
      }
    });
  }));
};