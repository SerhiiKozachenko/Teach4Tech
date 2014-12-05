angular.module('Teach4Tech.Admin.Services.binaryServerClient', [])
  .service('binaryServerClient', ['utils', function(utils){
  	return new function(){

  		var hostname = window.location.hostname;
  		// Todo: need to wrap global dependency into factory
		var client = new BinaryClient('ws://' + hostname + ':3000');

		// PUBLIC
		this.emit = function(event, data, file){
			return _emit(event, data, file);
  		};


  		// PRIVATE

  		function _emit(event, data, file) {
		    file = file || {};
		    data = data || {};
		    data.event = event;

		    return client.send(file, data);
		};

  	};
  }]);