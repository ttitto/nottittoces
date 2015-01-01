"use strict";

adsApp.directive('towns', [function () {
    return{
        restrict: 'A',
        templateUrl: './app/templates/directives/towns.html',
        link: function (scope) {
            scope.filterByTown = function (town) {
                if (town) {
                    angular.extend(scope.requestParams, {townId: town.id});
                } else {
                    delete scope.requestParams['townId'];
                }
                scope.getListedItems(scope.requestParams);
            }
        }
    }
}]);