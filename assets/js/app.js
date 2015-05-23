'use strict';
var module = angular.module('myCanvasApp', ['ngRoute']);
module.config(['$routeProvider', function($routeProvider) {
  // $httpProvider.interceptors.push('SenecaInterceptor');
  $routeProvider.
  when('/', {
      templateUrl: 'templates/main-page.html',
      controller: 'mainCtrl'
  }).
    otherwise({
      redirectTo: '/'
    });
}]);