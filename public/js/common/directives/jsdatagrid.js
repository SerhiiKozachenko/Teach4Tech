angular.module('JsDataGrid', [])
  .directive('jsdatagrid',[function(){
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