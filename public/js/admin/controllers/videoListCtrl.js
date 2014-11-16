angular.module('Teach4Tech.Admin.Controllers.VideoList', [])
  .controller('VideoListCtrl', ['$scope', 'VideoListVm', function($scope, Viewmodel){
  	$scope.vm = new Viewmodel;
  }]);