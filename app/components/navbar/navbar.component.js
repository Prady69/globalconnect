'use strict';

angular.
  module('globalconnectApp').
  component('navbar', {
    templateUrl: 'components/navbar/navbar.template.html',
    controller:
      function navbarController() {
        var self = this;
        this.username = 'Pradosh';
      }
  });