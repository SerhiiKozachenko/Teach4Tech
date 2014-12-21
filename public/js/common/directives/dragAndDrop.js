angular.module('DragAndDrop', ['Utils'])
  .directive('dropHandler',['$log', function($log){
    return {
      restrict: 'A',
      scope: {
        dropHandler: '&',
      },
      link: function (scope, element, attr) {
        var el = angular.element(element);
      	el.on('dragenter', _fizzle);
        el.on('dragover', _fizzle);
        el.on('drop', _onDrop);

        scope.$on('$destroy', function() {
          $log.debug('dropHandler died');
          el.off('dragenter', _fizzle);
          el.off('dragover', _fizzle);
          el.off('drop', _onDrop);
        });

        function _onDrop(e){
          _fizzle(e);
          scope.dropHandler({data: e.originalEvent.dataTransfer});
        };
      }
    };

    function _fizzle(e){
      e.preventDefault();
      e.stopPropagation();
    };

  }]);