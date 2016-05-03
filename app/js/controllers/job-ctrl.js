'use strict';

angular
.module('app.controllers', ['ngSanitize'])
.controller('JobCtrl', function($scope, $stateParams, Restangular) {
    var id = $stateParams.id;
    $scope.loadingPromise = Restangular.one('jobs/' + id)
        .get()
        .then(function(job) {
            $scope.job = job;
            $scope.description = job.attributes.description;
        })
        .catch(function(error){
            console.log(error);
        });
});
