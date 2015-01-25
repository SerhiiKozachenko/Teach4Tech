
///
/// JWT CUSTOM AUTHENTICATION
///

var jwt = require('./jwt');
var SECRET_THAT_SHOULD_UPDATE = 'haasjdiae38';

module.exports = function (app){

  // ENABLE CORS
  app.use(function(req, res, next){
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      next();
  });

  
  app.use(function(req, res, next){

      // generate auth token
      // callback(error, token)
      req.login = function (user, callback){
        // generate jwt
        var payload = {
          iss: req.hostname,
          sub: user.id
        };

        var token = jwt.encode(payload, SECRET_THAT_SHOULD_UPDATE);

        // Todo: save user to redis

        // error, token
        callback(null, token);
      };

      // check is req is authenticated
      // callback(error, user)
      req.isAuthenticated = function (callback){

        if (!req.headers.authorization || req.headers.authorization.split(' ').length < 2) {
          callback(new Error('No authorization header'));
        } else {
          var token = req.headers.authorization.split(' ')[1];
          try {
            var payload = jwt.decode(token, SECRET_THAT_SHOULD_UPDATE);
            if (!payload || !payload.sub) {
              callback(new Error('Authentication failed'));
            } else {
              // Todo: resolve user by id (sub) from redis
              callback(null, {});
            }
          }catch(err) {
            callback(err);
          }
          
        }
        
      };

      next();
  });

  // Todo: add check Authorization header

};