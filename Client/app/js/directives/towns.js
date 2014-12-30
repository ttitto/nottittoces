adsApp.directive('towns', [function () {
    return{
        restrict: 'A',
        templateUrl: './app/templates/directives/towns.html',
        link: function (scope) {
            scope.filterByTown = function (town) {
                if (town) {
                    angular.extend(scope.adsRequestParams, {townId: town.id});
                } else {
                    delete scope.adsRequestParams['townId'];
                }
                scope.getAds(scope.adsRequestParams);
            }
        }
    }
}]);