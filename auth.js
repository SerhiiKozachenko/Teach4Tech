var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var redis = require('redis');
var cache = redis.createClient();
var winston = require('winston');

var REDIS_USER_EXPIRATION_SECONDS = 21600; // 6 Hrs

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ name: username }, function(err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, 'Incorrect username');
      }
      user.comparePassword(password, function(err, isMatch){
        if (err) return done(err);
        if (!isMatch){
          done(null, false, 'Incorrect password');
        } else {
          done(null, { id: user.id, name: user.name });
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  cache.setex('user:'+user.id, REDIS_USER_EXPIRATION_SECONDS, JSON.stringify({ id: user.id, name: user.name }));
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  cache.get('user:'+id, function(err, result){
    if (err){
      winston.error('Redis, deserializeUser: '+ err.stack);
    } else if (!result) {
      winston.debug('Redis, deserializeUser: empty get from db');
      User.findById(id, function(err, user) {
        if (!err) {
          cache.setex('user:'+id, REDIS_USER_EXPIRATION_SECONDS, JSON.stringify({ id: user.id, name: user.name }));
        }
        done(err, { id: user.id, name: user.name });
      });
    } else {
      winston.debug('Redis, deserializeUser: cool get from redis');
      winston.debug('Result: ' + result);
      done(null, JSON.parse(result));
    }
  })
});