'use strict';

angular
.module('app.controllers')
.controller('MainCtrl', function($scope, $location) {
  $scope.date = new Date();
});
