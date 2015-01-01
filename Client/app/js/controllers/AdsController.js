"use strict";

adsApp.controller('AdsController', ['$scope', 'pageSize', 'CategoriesResource', 'TownsResource', 'AdsResource',
    function ($scope, pageSize, CategoriesResource, TownsResource, AdsResource) {
        $scope.categories = CategoriesResource.all();
        $scope.towns = TownsResource.all();

        $scope.requestParams = {startPage: 1, pageSize: pageSize};

        $scope.getListedItems = function (adsRequestParams) {
            AdsResource.all(adsRequestParams).then(
                function (data) {
                    $scope.ads = data.ads;
                    $scope.pagesArr = new Array(data.numPages);
                }
            )
        };

        $scope.getListedItems($scope.requestParams);
    }]);
