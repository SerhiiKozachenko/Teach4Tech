angular.module('BinaryClient', [])
  .service('binaryClient', ['$log', '$q', function($log, $q){
  	return new function(){

      var hostname = window.location.hostname;
      var port = window.location.port;
      var binaryClient = new BinaryClient('ws://' + hostname + ':' + port);

      var VIDEO_UPLOAD_EVENT = "video-upload";
      var VIDEO_GET_EVENT = "video-request";

      binaryClient.on('open', function () {
        $log.debug('Binary client: started');
      });

      binaryClient.on('stream', function (stream) {
        $log.debug('Binary client: stream received');
      });

      this.uploadVideo = function(file) {
        var deferred = $q.defer();

        var stream = _emit(VIDEO_UPLOAD_EVENT, {
            name: file.name,
            size: file.size,
            type: file.type
          }, file);

        stream.on('data', function (data) {
          if (data.end) {
            deferred.resolve(data);
          } else {
            deferred.notify(data);
          }
        });

        stream.on('error', function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      };

      this.getVideo = function(fileName, cb) {
        _emit(VIDEO_GET_EVENT, { name : fileName });
        binaryClient.on('stream', function (stream) {
          var parts = [];
          stream.on('data', function (data) {
            parts.push(data);
          });
          stream.on('error', function (err) {
            cb(err);
          });

          stream.on('end', function () {
            var src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
            cb(null, src);
          });
        });
      };

      function _emit(event, data, file) {
        file = file || {};
        data = data || {};
        data.event = event;

        return binaryClient.send(file, data);
      };


  	};
  }]);
