'use strict';

angular
.module('app.controllers')
.controller('JobBoardCtrl', function($scope, Restangular) {
    $scope.filter = {};

    $scope.filterJobs = function(option) {
        $scope.jobs = $scope.filter.positionLevelFiltersToJobs[option]
    };

    $scope.loadingPromise = Restangular.one('jobs?include=employer&sort=-created&filter[simple][isApproved]=true')
        .get()
        .then(function(jobs) {
            $scope.filter.positionLevelFilters = {};
            $scope.filter.positionLevelFiltersToJobs = {};
            $scope.filter.positionLevelFilters['All'] = 'All';
            $scope.filter.positionLevelFiltersToJobs['All'] = jobs;
            _(jobs).forEach(function (val) {
                $scope.filter.positionLevelFilters[val.attributes.positionLevel] = val.attributes.positionLevel;
                if (!$scope.filter.positionLevelFiltersToJobs[val.attributes.positionLevel]) {
                    $scope.filter.positionLevelFiltersToJobs[val.attributes.positionLevel] = [];
                }
                $scope.filter.positionLevelFiltersToJobs[val.attributes.positionLevel].push(val);
            }).value();
            $scope.jobs = jobs;
            console.log($scope.filter);
        })
        .catch(function(error){
            console.log(error);
        });
});