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

    var socket = io();

    var handleNewUserSocket = function (data) {
      console.log(data);
      $scope.users.push(data);
      $scope.$digest();
    };

    var handleUpdateUserSocket = function(data){
      console.log(data);
      var userIndex = _.findIndex($scope.users, {name:data.name});
      $scope.users[userIndex] = data;
      $scope.$digest();
    };

    var handleError = function (data, status) {
      console.log(data, status);
    };

    socket.on('newUserCreated', handleNewUserSocket);
    socket.on('userUpdated', handleUpdateUserSocket);

    $scope.temp = 'testing';

    $scope.users = [];
    
    $scope.attendedClass = function(attended){
      return 'attended-' + attended.toLowerCase();
    };

    $scope.submitNewUser = function () {
      console.log('posting');
      $http.post('/user/new', {name: $scope.newUserName}).
        success(function (data) {
          console.log(data);
        }).
        error(handleError);
    };

    //$scope.getUsers = function(){
    $http.get('/user').
      success(function (data) {
        console.log(data);
        $scope.users = data;
      }).
      error(handleError);
    //};
  });
