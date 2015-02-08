angular.module('Teach4Tech.Admin.Directives.Menu', [])
.directive('menu', [function(){
 return {
      restrict: 'A',
      template: '<li ng-repeat="item in menuItems" ng-class="{active: isActive(item.root)}"><a ui-sref="{{item.state}}"><span class="{{item.iconClass}}"></span>&nbsp;&nbsp;{{item.title}}</a></li>',
      controller: ['$scope', '$state', function ($scope, $state) {
      	$scope.menuItems = [{
      	    title: 'Statistics',
  		      state: 'statistics',
  		      root: 'statistics',
            iconClass: 'glyphicon glyphicon-stats'
      	  }, {
  		      title: 'Lessons',
		        state: 'videos.list',
		        root: 'videos',
            iconClass: 'glyphicon glyphicon-film'
      	  }, {
  		      title: 'Articles',
		        state: 'articles',
		        root: 'articles',
            iconClass: 'glyphicon glyphicon-pencil'
      	  }, {
  		      title: 'Courses',
		        state: 'courses',
		        root: 'courses',
            iconClass: 'glyphicon glyphicon-list-alt'
      	  }, {
  		      title: 'Messages',
		        state: 'messages',
		        root: 'messages',
            iconClass: 'glyphicon glyphicon-comment'
      	}];

      	$scope.isActive = function(root) {
      	  return $state.includes(root);
      	};
      }]
    };
}]);
