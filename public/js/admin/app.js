angular.module('Teach4Tech.Admin', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
   function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('statistics', {
        url: "/",
        templateUrl: "templates/statistics.html",
        //controller: 'AdminCtrl'
      })
      .state('uploadVideo', {
        url: "/uploadVideo",
        templateUrl: "templates/uploadVideo.html",
        //controller: 'VideoAddCtrl'
      })
      .state('messages', {
        url: "/messages",
        templateUrl: "templates/messages.html",
        //controller: 'MessagesCtrl'
      });
  }]);