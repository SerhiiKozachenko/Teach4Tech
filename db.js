var logger = require('./logger');
var mongoose = require('mongoose');

module.exports = function(onDbConnected){
  logger.info('Connecting to db');
  var conn = mongoose.connect('mongodb://localhost/teach4tech', function(err){
  	if (err){
      logger.error('Connection to db failed');
  	} else {
      logger.info('Connected to db');
      onDbConnected();
  	}
  });

  mongoose.connection.on('error', function(err){
    logger.error('DB ERROR: '+err);
  });
};
