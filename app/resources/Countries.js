(function() {
    "use strict";
    angular.module("globalconnectApp").factory("CountriesService", [
        "$http",
        function($http) {
            let getCountries = function(searchText) {
                return $http({
                    method: 'GET',
                    url: 'https://restcountries.eu/rest/v2/name/' + searchText
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback() {
                    return [];
                });
            };
            return {
                getCountries: getCountries
            };
        }
    ]);
})();