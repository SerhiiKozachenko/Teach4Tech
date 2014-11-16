angular.module('JsDataGrid', [])
  .directive('jsdatagrid',['$compile', function($compile){
    return {
      restrict: 'A',
      scope: {
        config: '=',
      },
      link: function (scope, element, attr) {
      	angular.element(element).kendoGrid(scope.config);
        var grid = angular.element(element).data("kendoGrid");
        scope.$on('$destroy', function() {
          console.log('destroy');
          grid.destroy();
        });
      }
    };

  }]);