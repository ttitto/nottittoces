"use strict";

adsApp.controller('AdsController', ['$scope', 'CategoriesResource', 'TownsResource',
    function ($scope, CategoriesResource, TownsResource) {
        $scope.categories = CategoriesResource.all();
        $scope.towns = TownsResource.all();
    }]);
