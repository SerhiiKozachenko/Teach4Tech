var BinaryServer = require('binaryjs').BinaryServer;
var videoService = require('./services/videoSvc');
var winston = require('winston');

module.exports = function(server){
  winston.info('Binary server init');
  
  var bs = new BinaryServer({ server: server });

  bs.on('connection', function (client) {
    client.on('stream', function (stream, meta) {
        switch(meta.event) {
        // list available videos
        case 'video-list':
            winston.debug('Binary server: video-list call');
            videoService.getList(stream, meta);
            break;
 
        // request for a video
        case 'video-request':
            winston.debug('Binary server: video-request call');
            videoService.getVideo(client, meta);
            break;
 
        // attempt an upload
        case 'video-upload':
        default:
            winston.debug('Binary server: video-upload call');
            videoService.save(stream, meta);
        }
    });
});
};