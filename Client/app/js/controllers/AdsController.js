"use strict";

adsApp.controller('AdsController', ['$scope', 'CategoriesResource',
    function ($scope, CategoriesResource) {
        $scope.categories = CategoriesResource.all();
    }]);
