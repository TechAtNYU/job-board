'use strict';

angular.module('app')
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'partials/jobs.html',
            controller: 'MainCtrl'
        })
        .state('job', {
            url: '/job/:id',
            templateUrl: 'partials/job.html',
            controller: 'JobCtrl'
        })
        .state('submit', {
            url: '/submit',
            templateUrl: 'partials/job-add.html',
            controller: 'NewJobCtrl'
        });
});