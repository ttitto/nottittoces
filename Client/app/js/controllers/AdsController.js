"use strict";

adsApp.controller('AdsController', ['$scope', 'CategoriesResource', 'TownsResource', 'AdsResource',
    function ($scope, CategoriesResource, TownsResource, AdsResource) {
        $scope.categories = CategoriesResource.all();
        $scope.towns = TownsResource.all();

        AdsResource.all(2).then(
            function (data) {
                $scope.ads = data.ads;
                $scope.getNumPages = new Array(data.numPages);
            }
        );
    }]);
