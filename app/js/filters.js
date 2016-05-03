'use strict';

angular.module('app.filters', [])
.filter('firstSentence', function() {
    return function(str) {
        return str.split('.')[0] + '.';
    };
});