'use strict';

angular
.module('app.controllers')
.controller('JobBoardCtrl', function($scope, Restangular) {
    $scope.filter = {};

    $scope.loadingPromise = Restangular.one('jobs?include=employer&sort=-created&filter[simple][isApproved]=true')
        .get()
        .then(function(jobs) {
            $scope.filter['positionLevelFilters'] = [];
            _(jobs).forEach(function (val) {
                $scope.filter['positionLevelFilters'].push(val.attributes.positionLevel);
            }).value();
            $scope.jobs = jobs;
        })
        .catch(function(error){
            console.log(error);
        });
});