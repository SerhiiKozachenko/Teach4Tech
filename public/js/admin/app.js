angular.module('Teach4Tech.Admin', [
	'ui.router',
	'JsDataGrid',
  'DragAndDrop',
  'Utils',
  'BinaryClient',
	'ngAnimate',
	'toaster',
	'Teach4Tech.Admin.Controllers',
	'Teach4Tech.Admin.Viewmodels',
  'Teach4Tech.Admin.Services',
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
        templateUrl: "views/admin/statistics.html"
      })
      .state('videos', {
        abstract: true,
        url: "/videos",
        template: "<div ui-view></div>"
      })
      .state('videos.list', {
        url: "/",
        templateUrl: "views/admin/video-list.html",
        controller: 'VideoListCtrl'
      })
      .state('videos.edit', {
        url: "/:id/edit",
        templateUrl: "views/admin/video-edit.html",
        controller: 'VideoEditCtrl'
      })
      .state('videos.add', {
        url: "/new",
        templateUrl: "views/admin/video-add.html",
        controller: 'VideoAddCtrl'
      })
      .state('articles', {
        url: "/articles",
        templateUrl: "views/admin/article-list.html"
      })
      .state('courses', {
        url: "/courses",
        templateUrl: "views/admin/course-list.html"
      })
      .state('messages', {
        url: "/messages",
        templateUrl: "views/admin/messages.html"
      });
  }]);
