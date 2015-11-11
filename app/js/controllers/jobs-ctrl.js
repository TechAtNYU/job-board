'use strict';

angular
.module('app.controllers')
.controller('JobBoardCtrl', function($scope, Restangular) {
    Restangular.one('jobs')
        .get()
        .then(function(jobs) {
            $scope.jobs = jobs;
        })
        .catch(function(error){
            console.log(error);
        });
});