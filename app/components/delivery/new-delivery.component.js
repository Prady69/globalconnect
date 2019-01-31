'use strict';

angular.
  module('globalconnectApp').
  component('newDelivery', {
    templateUrl: 'components/delivery/new-delivery.template.html',
    controller:['$http','$mdSidenav', '$mdDialog', 'CountriesService', '$window', '$scope',
    function newDeliveryController($http, $mdSidenav, $mdDialog, CountriesService, $window, $scope) {
        var self = this;
        this.username = "Pradosh";
        this.minDate = new Date();
        this.typeFields = ['Paper', 'Plastic', 'Textile', 'Other'];
        this.densityFields = ['Low', 'Mid', 'High'];
        this.currentDeliveryCount = $window.localStorage.length;
        $window.document.title = 'Delivery | Global Connect';
        this.setDeliveryObject = function() {
            this.deliveryObj = {
                routeDetails : {},
                freightDetails : {},
                dateTimeDetails : {}
            };
        };

        this.query = function(searchText) {
            return CountriesService.getCountries(searchText);
          };

        this.submit = function() {
              let newOrderId = this.getOrderId() || 1;
              self.deliveryObj.routeDetails.pickupCountry = self.filterOutTheLocationObj(self.deliveryObj.routeDetails.pickupCountry);
              self.deliveryObj.routeDetails.deliveryCountry = self.filterOutTheLocationObj(self.deliveryObj.routeDetails.deliveryCountry);
              self.deliveryObj.id = "order#" + newOrderId;
              self.deliveryObj.username = self.username;
              $window.localStorage.setItem(newOrderId, JSON.stringify(self.deliveryObj));
              self.currentDeliveryCount =  $window.localStorage.length;
              $scope.$broadcast('deliveryCountChanged', self.currentDeliveryCount);
              this.showAlert();
          };

        this.reset = function() {
              angular.forEach(self.forms, function(item){
                item.$setPristine();
                item.$setUntouched();
            });
            this.setDeliveryObject();
          };

        this.showAlert = function() {
              $mdDialog.show(
                  $mdDialog.alert()
                      .parent()
                      .clickOutsideToClose(true)
                      .title('Order placed successfully')
                      .textContent('')
                      .ariaLabel('Order Success')
                      .ok('Okay, Got it!')
                      .targetEvent()
              );
          };

        this.showConfirmForSubmit = function(ev) {
              let confirm = $mdDialog.confirm()
                  .title('Do you want to confirm the delivery?')
                  .textContent('')
                  .ariaLabel('delivery confirmation')
                  .targetEvent(ev)
                  .ok('Yes, Confirm')
                  .cancel('No, Take me back');

              $mdDialog.show(confirm).then(function() {
                  self.submit();
                  self.reset();
              }, function() {});
          };

        this.showConfirmForReset = function(ev) {
              var confirm = $mdDialog.confirm()
                  .title('Are you sure you want to proceed?')
                  .textContent('All data will be lost.')
                  .ariaLabel('reset confirmation')
                  .targetEvent(ev)
                  .ok('Yes, Reset')
                  .cancel('No, Take me back');

              $mdDialog.show(confirm).then(function() {
                  self.reset();
              }, function() {});
          };

        this.selectedCountryChange = function(){
              let deliveryCountry = self.deliveryObj.routeDetails.deliveryCountry,
                  pickupCountry = self.deliveryObj.routeDetails.pickupCountry;
              self.deliveryObj.calculations = {};

              if(!(deliveryCountry && pickupCountry)){
                    return;
              }

              if(deliveryCountry.name === pickupCountry.name){
                  self.forms.routeForm.$valid = false;
                  return;
              }
              self.deliveryObj.calculations.estimatedDistance = self.calculateDistance();
              self.deliveryObj.calculations.estimatedFare = self.calculateFare();
          };

        this.calculateDistance = function(){
              var lat1 = self.deliveryObj.routeDetails.deliveryCountry.latlng[0],
                  lon1 = self.deliveryObj.routeDetails.deliveryCountry.latlng[1],
                  lat2 = self.deliveryObj.routeDetails.pickupCountry.latlng[0],
                  lon2 = self.deliveryObj.routeDetails.pickupCountry.latlng[1];

              //copied method to calculate distance between countries
              if ((lat1 == lat2) && (lon1 == lon2)) {
                  return 0;
              }
              else {
                  var radlat1 = Math.PI * lat1/180,
                    radlat2 = Math.PI * lat2/180,
                    theta = lon1-lon2,
                    radtheta = Math.PI * theta/180,
                    dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist > 1) {
                      dist = 1;
                  }
                  dist = Math.acos(dist);
                  dist = dist * 180/Math.PI;
                  dist = dist * 60 * 1.1515;
                  dist = dist * 1.609344;
                  return dist.toFixed(2);
              }
          };

        this.calculateFare = function () {
              if(!self.deliveryObj.calculations.estimatedDistance){
                  return;
              }
              //assuming 1 km = 3.3euros as carrier charge
              return (self.deliveryObj.calculations.estimatedDistance * 3.3).toFixed(2);
          };

        this.filterOutTheLocationObj = function(obj){
              //filtering out the country object and saving only required properties
              var neededPropsObj = ['name', 'flag', 'latlng', 'currencies' ];
              return _.map(neededPropsObj, function(item){
                  return _.pick(obj, item);
              });
          };

        this.getOrderId = function(){
              let lastId = "";
              if($window.localStorage.length == 0){
                  return;
              }
              Object.keys($window.localStorage).forEach(function(key){
                  let obj = JSON.parse($window.localStorage.getItem(key));
                  if(obj.id.indexOf('order') > -1) {
                      lastId = obj.id;
                  }
              });
              return (+lastId.replace("order#","") + 1);
          };
      }]
  });
