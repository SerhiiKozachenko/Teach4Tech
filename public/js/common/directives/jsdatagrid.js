angular.module('JsDataGrid', [])
  .directive('jsdatagrid',['$compile', function($compile){
    return {
      restrict: 'A',
      scope: {
        config: '=',
      },
      link: function (scope, element, attr) {
      	angular.element(element).kendoGrid(scope.config);
      }
    }

  }]);