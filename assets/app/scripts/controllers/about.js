'use strict';

/**
 * @ngdoc function
 * @name assetsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the assetsApp
 */
angular.module('assetsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
