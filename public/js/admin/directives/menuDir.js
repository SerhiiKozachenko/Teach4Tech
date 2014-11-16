angular.module('Teach4Tech.Admin.Directives.Menu', [])
.directive('menu', [function(){
 return {
      restrict: 'A',
      template: '<li ng-repeat="item in menuItems" ng-class="{active: isActive(item.root)}"><a ui-sref="{{item.state}}">{{item.title}}</a></li>',
      controller: ['$scope', '$state', function ($scope, $state) {
      	$scope.menuItems = [{
      	  title: 'Статистика',
  		  state: 'statistics',
  		  root: 'statistics'
      	}, {
  		  title: 'Видеозаписи',
		  state: 'videos.list',
		  root: 'videos'
      	}, {
  		  title: 'Статьи',
		  state: 'articles',
		  root: 'articles'
      	}, {
  		  title: 'Курсы',
		  state: 'courses',
		  root: 'courses'
      	}, {
  		  title: 'Сообщения',
		  state: 'messages',
		  root: 'messages'
      	}];

      	$scope.isActive = function(root) {
      	  return $state.includes(root);
      	};
      }]
    };
}]);