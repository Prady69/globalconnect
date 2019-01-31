'use strict';

angular.
  module('globalconnectApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/delivery', {
          template: '<new-delivery></new-delivery>'
        }).
        when('/orders',{
          template: '<current-delivery></current-delivery>'
        }).
        when('/history',{
            template: '<history></history>'
        }).
      otherwise('/delivery');
    }
  ]);
