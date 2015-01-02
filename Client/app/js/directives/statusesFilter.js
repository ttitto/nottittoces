"use strict";

adsApp.directive('statusesFilter', [function () {
    return{
        restrict: 'A',
        templateUrl: './app/templates/directives/statuses-filter.html',
        link: function (scope) {
            scope.filterByStatus = function (status) {
                if (status) {
                    angular.extend(scope.requestParams, {status: status});
                } else {
                    delete scope.requestParams['status'];
                }
                scope.getListedItems(scope.requestParams);
            }
        }
    }
}]);