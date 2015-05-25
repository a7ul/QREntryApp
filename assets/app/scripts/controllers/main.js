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
      refresh();
    };

    var handleUpdateUserSocket = function(data){
      console.log(data);
      var userIndex = _.findIndex($scope.users, {name:data.name});
      $scope.users[userIndex] = data;
      refresh();
    };

    var handleError = function (data, status) {
      console.log(data, status);
    };

    socket.on('newUserCreated', handleNewUserSocket);
    socket.on('userUpdated', handleUpdateUserSocket);

    $scope.attendanceStatistics = {};

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
    
    var getAttendanceStatistics = function(){
      console.log('getting total attended');
      var total = 0 ;
      var attended = 0;
      var findTotal = function(item){
        if(item.attended.toLowerCase() === 'yes'){
          attended += 1;
        }
        total += 1;
      }
      _.each($scope.users, findTotal);
      return {
        total : total,
        attended : attended,
        notAttended : total - attended
      };
    };
    
    var refresh = function(){
      $scope.attendanceStatistics = getAttendanceStatistics();
      $scope.$digest();
    }

    //$scope.getUsers = function(){
    $http.get('/user').
      success(function (data) {
        console.log(data);
        $scope.users = data;
        refresh();
      }).
      error(handleError);
    //};
  });
