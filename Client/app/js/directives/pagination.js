"use strict";
adsApp.directive('pagination', [function () {
    return {
        restrict: 'A',
        templateUrl: './app/templates/directives/pagination.html',
        scope:true,
        link: function (scope) {
            scope.firstPage = function () {
                scope.requestParams.startPage = 1;
                scope.getListedItems(scope.requestParams);
            };
            scope.prevPage = function () {
                if (parseInt(scope.requestParams.startPage) > 1) {
                    scope.requestParams.startPage -= 1;
                }
                scope.getListedItems(scope.requestParams);
            };

            scope.setStartPage = function (startPage) {
                scope.requestParams.startPage = startPage;
                scope.getListedItems(scope.requestParams);
            };

            scope.nextPage = function (length) {
                if (scope.requestParams.startPage < length) {
                    scope.requestParams.startPage += 1;
                }

                scope.getListedItems(scope.requestParams);
            };

            scope.lastPage = function (length) {
                scope.requestParams.startPage = length;
                scope.getListedItems(scope.requestParams);
            };
        }
    }
}]);
