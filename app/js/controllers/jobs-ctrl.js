'use strict';

angular
.module('app.controllers')
.controller('JobBoardCtrl', function($scope, Restangular) {
    Restangular.one('jobs?include=employer&sort=-created&filter[simple][isApproved]=true')
        .get()
        .then(function(jobs) {
            $scope.jobs = jobs;
        })
        .catch(function(error){
            console.log(error);
        });
});