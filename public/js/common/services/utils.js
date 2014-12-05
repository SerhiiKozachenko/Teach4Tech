angular.module('Utils', [])
  .service('utils', [ function(){
  	return new function(){
      
		  // PUBLIC
		  this.fizzleEvent = function(event){
			 return _fizzle(event);
  		};


  		// PRIVATE
  		function _fizzle(event) {
 			  event.preventDefault();
    		event.stopPropagation();
  		};

  	};
  }]);