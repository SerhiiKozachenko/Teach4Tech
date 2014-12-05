angular.module('Teach4Tech.Admin.Controllers.VideoAdd', [])
  .controller('VideoAddCtrl', ['$scope', 'VideoAddVm', function($scope, Viewmodel){
  	$scope.vm = new Viewmodel;
  }]);