angular.module('Teach4Tech.Admin.Viewmodels.VideoAdd', [])
  .factory('VideoAddVm', [
  	'$state', '$timeout', 'utils', 'binaryClient', '$log', '$http', 'toaster',
   	function($state, $timeout, utils, binaryClient, $log, $http, toaster){
  	return function(){

  		var self = this;

  		this.model = {};

      this.pc = 0;

    	this.onVideoDropped = function(data){
    		var file = data.files[0];
    		var tx = 0;
        
        _showLoading();

        binaryClient.uploadVideo(file)
    		.then(function(data){
    			$log.debug('Video uploaded successfully');
    			self.model.fileName = data.fileName;
    			binaryClient.getVideo(data.fileName, function(err, src) {
    				$log.debug('Video received successfully');
    				$video = angular.element('#video')
    				$video.attr({
				        controls : true,
				        autoplay : true
				    });
    				$video.attr('src', src);
    			});
    		},
    		angular.noop,
    		function(data){
          var pc = Math.round(tx += data.rx * 100);
          self.pc = pc;
          var status = pc + '% complete';
    			$log.debug('Video uploading: ' + status);
    		})
    		.catch(function(err){
    			var err = err.err;
    			$log.error('Video uploading error: ' + err);
    		}).finally(_hideLoading);
    	};

    	this.save = function() {
    		debugger
    		$http.post('/api/admin/video/add', self.model)
    			.success(function(data){
    				debugger
    			})
    			.error(function(err){
    				debugger
    			});
    	};

      function _showLoading(){
        toaster.pop('warning', "Uploading...", "videoUploadProgress", null, 'template');
      };

      function _hideLoading(){
        toaster.clear();
      };

    	this.remove = function() {

    	};
  	};
  }]);
