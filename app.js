var express = require('express');
var cluster = require( 'cluster' );
var cCPUs = require('os').cpus().length;
var redis = require('redis');
var cache = redis.createClient();

var bodyParser = require('body-parser');
var logger = require('./logger');
var morgan = require('morgan');
var lessMiddleware = require('less-middleware');

process.on('uncaughtException', function (err) {
  logger.error(err.stack);
});

if (cluster.isMaster){
  for(var i=0; i<cCPUs; i++){
    cluster.fork();
  }

  cluster.on('online', function(worker){
    logger.info('Worker #'+ worker.process.pid +' online'); 
  });

  cluster.on('exit', function(worker, code, signal){
    logger.info('Worker #'+ worker.process.pid +' died, code: '+code + ', signal: '+signal); 
  });
} else{
  require('./db')(_startWorker);
}

// bootstrap cluster
function _startWorker(){
  var app = express();
  app.set('views', './views');
  app.set('view engine', 'jade');
  app.engine('jade', require('jade').__express);

  var winstonStream = {
    write: function(message, encoding){
      logger.info(message);
    }
  };

  // moddleware for stream all errors (404, etc.) to winston logger
  app.use(morgan('combined',{ "stream": winstonStream}));

  app.use(lessMiddleware(__dirname + '/public', {force: true}));
  app.use(express.static(__dirname + '/public'));

  // user count (diff by user-agent: save it to redis hash)
  app.use(function(req, res, next){
    var ua = req.headers['user-agent'];
    cache.zadd('online', Date.now(), ua, next);
  });

  // get user count from redis and save to req obj
  app.use(function(req, res, next){
    var min = 60 * 1000;
    var ago = Date.now() - min;
    cache.zrevrangebyscore('online', '+inf', ago, function(err, users){
      if (err) return next(err);
      req.online = users;
      next();
    });
  });

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // auth middleware init
  require('./auth')(app);

  require('./helpers')(app);

  // init routing
  require('./routes')(app);

  // start http and websocket server
  var server = app.listen(3000, function(){
    logger.info('Listening on port %d', server.address().port);
  });
  require('./binaryServer')(server);
};





