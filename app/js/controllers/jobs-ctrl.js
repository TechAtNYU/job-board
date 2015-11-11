'use strict';

angular
.module('app.controllers')
.controller('JobBoardCtrl', function($scope, Restangular) {
    Restangular.one('jobs?include=employer&sort=-created')
        .get()
        .then(function(jobs) {
            $scope.jobs = jobs;
        })
        .catch(function(error){
            console.log(error);
        });
});