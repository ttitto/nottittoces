"use strict";

adsApp.directive('categories', [function () {
    return {
        restrict: 'A',
        templateUrl: './app/templates/directives/categories.html',
        link: function (scope) {
            scope.filterByCategory = function (category) {
                if (category) {
                    angular.extend(scope.requestParams, {categoryId: category.id});
                } else {
                    delete scope.requestParams['categoryId'];
                }
                scope.requestParams.startPage = 1;
                scope.getListedItems(scope.requestParams);
            }
        }
    }
}]);
