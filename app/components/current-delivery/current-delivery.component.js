'use strict';

angular.
module('globalconnectApp').
component('currentDelivery', {
    templateUrl: 'components/current-delivery/current-delivery.template.html',
    controller:['$window', '$mdDialog', '$scope',
        function newDeliveryController($window, $mdDialog, $scope) {
            var self = this;
            this.currentDeliveryCount = $window.localStorage.length;
            $window.document.title = "Current Orders | Global Connect";
            this.currentOrders = [];
            this.username = 'Pradosh';

            Object.keys($window.localStorage).forEach(function(key){
                let obj = JSON.parse($window.localStorage.getItem(key));
                if(obj.id.indexOf('order') > -1 && obj.username === self.username) {
                    self.currentOrders.push(obj);
                }
            });

            this.getFormattedDate = function getFormattedDate(dateString){
                return new Date(dateString).toLocaleDateString();
            };

            this.showAlert = function(id) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent()
                        .clickOutsideToClose(true)
                        .title(id + ' is cancelled!')
                        .textContent('')
                        .ariaLabel('Order deleted')
                        .ok('Ok')
                        .targetEvent()
                );
            };

            this.showConfirmForCancel = function(id) {
                var confirm = $mdDialog.confirm()
                    .title('Do you want to cancel the order delivery?')
                    .textContent('')
                    .ariaLabel('order deletion confirmation')
                    .targetEvent()
                    .ok('Yes, Delete')
                    .cancel('No, Take me back');

                $mdDialog.show(confirm).then(function() {
                    self.cancelOrder(id);
                    self.showAlert(id);
                }, function() {});
            };

            this.cancelOrder = function(id){
                self.currentOrders = _.filter(this.currentOrders, function(item){
                    return item.id != id;
                });
                $window.localStorage.removeItem(+id.replace('order#',""));
                self.currentDeliveryCount--;
                $scope.$broadcast('deliveryCountChanged', self.currentDeliveryCount);
            };
        }
    ]
});
