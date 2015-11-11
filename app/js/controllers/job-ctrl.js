'use strict';

angular
.module('app.controllers')
.controller('JobCtrl', function($scope, $stateParams, Restangular) {
    var id = $stateParams.id;
    Restangular.one('jobs/' + id)
        .get()
        .then(function(job) {
            $scope.job = job;
        })
        .catch(function(error){
            console.log(error);
        });
});