var winston = require('winston');
var home = require('./home');
var log = require('./log');
var blog = require('./blog');
var auth = require('./auth');
var admin = require('./admin');

module.exports = function(app){
  
  winston.info('MVC routes init started');

  app.use('/auth', auth);
  app.use('/', home);
  app.use('/logs', log.routes);
  app.use('/blog', blog);
  app.use('/admin', admin);
  require('./adminAPI')(app);

  app.use(log.console);
  app.use(log.xhr);
  app.use(log.showErrorPage);

  winston.info('MVC routes init done');
};