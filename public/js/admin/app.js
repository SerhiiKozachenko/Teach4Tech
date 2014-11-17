angular.module('Teach4Tech.Admin', [
	'ui.router',
	'JsDataGrid',
	'Teach4Tech.Admin.Controllers',
	'Teach4Tech.Admin.Viewmodels',
  'Teach4Tech.Admin.Directives'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
   function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('statistics', {
        url: "/",
        templateUrl: "templates/statistics.html"
      })
      .state('videos', {
        abstract: true,
        url: "/videos",
        template: "<div ui-view></div>"
      })
      .state('videos.list', {
        url: "/",
        templateUrl: "templates/video-list.html",
        controller: 'VideoListCtrl'
      })
      .state('videos.edit', {
        url: "/:id/edit",
        templateUrl: "templates/video-edit.html",
        controller: 'VideoEditCtrl'
      })
      .state('videos.add', {
        url: "/new",
        templateUrl: "templates/video-add.html",
        controller: 'VideoAddCtrl'
      })
      .state('articles', {
        url: "/articles",
        templateUrl: "templates/article-list.html"
      })
      .state('courses', {
        url: "/courses",
        templateUrl: "templates/course-list.html"
      })
      .state('messages', {
        url: "/messages",
        templateUrl: "templates/messages.html"
      });
  }]);