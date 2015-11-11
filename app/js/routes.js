'use strict';

angular.module('app')
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/',
            views: {
                'jobs': {
                    templateUrl: 'partials/jobs.html'
                },
                'filters': {
                    templateUrl: 'partials/filters.html'
                }
            },
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