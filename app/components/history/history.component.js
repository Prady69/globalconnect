'use strict';

angular.
module('globalconnectApp').
component('history', {
    templateUrl: 'components/history/history.template.html',
    controller:['$window',
        function newDeliveryController($window) {
            $window.document.title = "History | Global Connect";
        }
    ]
});
