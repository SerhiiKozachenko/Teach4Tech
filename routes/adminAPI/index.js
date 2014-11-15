var winston = require('winston');
var video = require('./video');

module.exports = function(app){
  
  winston.info('Admin API routes init started');

  app.use('/api/admin/video', video);
  
  winston.info('Admin API routes init done');
};