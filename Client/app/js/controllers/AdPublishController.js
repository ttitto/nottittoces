"use strict";

adsApp.controller('AdPublishController', ['$scope', 'messaging', 'CategoriesResource', 'TownsResource', 'AdsResource',
    function ($scope, messaging, CategoriesResource, TownsResource, AdsResource) {
        $scope.categories = CategoriesResource.all();
        $scope.towns = TownsResource.all();

        $scope.ad = {};

        $scope.getBase64 = function (base64String, attrs) {
            $scope.ad.imageDataUrl = base64String;
        };
    }]);