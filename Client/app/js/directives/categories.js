"use strict";

adsApp.directive('categories', [function () {
    return {
        restrict: 'A',
        templateUrl: './app/templates/directives/categories.html',
        link: function (scope) {
            scope.filterByCategory = function (category) {
                if (category) {
                    angular.extend(scope.adsRequestParams, {categoryId: category.id});
                } else {
                    delete scope.adsRequestParams['categoryId'];
                }
                scope.getAds(scope.adsRequestParams);
            }
        }
    }
}]);
