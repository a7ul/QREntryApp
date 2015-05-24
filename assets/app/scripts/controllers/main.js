'use strict';

/**
 * @ngdoc function
 * @name assetsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the assetsApp
 */
angular.module('assetsApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.temp = 'testing';

    $scope.users = [];

    $scope.submitNewUser = function () {
      console.log('posting');
      $http.post('/user/new', {name: $scope.newUserName}).
        success(function (data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(data);
        }).
        error(function (data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(data, status);
        });
    };

    $scope.getUsers = function(){
      $http.get('/user').
        success(function (data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(data);
          $scope.users = data;
        }).
        error(function (data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(data, status);
        });
    };
  });
