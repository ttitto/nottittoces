"use strict";
adsApp.directive('pagination', [function () {
    return {
        restrict: 'A',
        templateUrl: './app/templates/directives/pagination.html',
        link: function (scope) {
            scope.prevPage = function () {
                if (parseInt(scope.adsRequestParams.startPage) > 1) {
                    scope.adsRequestParams.startPage -= 1;
                }
                scope.getAds(scope.adsRequestParams);
            };

            scope.setStartPage = function (startPage) {
                scope.adsRequestParams.startPage = startPage;
                scope.getAds(scope.adsRequestParams);
            };

            scope.nextPage = function () {
                scope.adsRequestParams.startPage += 1;
                scope.getAds(scope.adsRequestParams);
            };

        }
    }
}]);
