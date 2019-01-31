'use strict';

angular.
module('globalconnectApp').
component('sidenav', {
    templateUrl: 'components/sidenav/sidenav.template.html',
    controller:['$http','$mdSidenav', '$mdDialog', 'CountriesService', '$window', '$scope',
        function sidenavController($http, $mdSidenav, $mdDialog, CountriesService, $window, $scope) {
            var self = this;
            this.name = 'Pradosh';
            this.minDate = new Date();
            this.toggleLeft = buildToggler('left');
            this.currentDeliveryCount = $window.localStorage.length;
            this.pastDeliveryCount = 0;

            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                };
            }

            $scope.$on('deliveryCountChanged', function(event, data) {
                self.currentDeliveryCount = data;
            });
        }]
});
