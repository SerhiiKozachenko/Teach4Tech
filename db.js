var winston = require('winston');
var mongoose = require('mongoose');

module.exports = function(onDbConnected){
  winston.info('Connecting to db');
  var conn = mongoose.connect('mongodb://localhost/teach4tech', function(err){
  	if (err){
      winston.error('Connection to db failed');
  	} else {
      winston.info('Connected to db');
      onDbConnected();
  	}
  });

  mongoose.connection.on('error', function(err){
    winston.error('DB ERROR: '+err);
  });
};
