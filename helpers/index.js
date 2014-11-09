var winston = require('winston');

module.exports = function(app){

  app.use(function(req, res, next){
  	
  	if (!!req.user) {
  	  res.locals.isLoggedIn = !req.user.anonymous;
      res.locals.userName = req.user.name;
  	}
    
    next();
  });
  
};