"use strict";

adsApp.controller('AdsController', ['$scope', 'CategoriesResource', 'TownsResource', 'AdsResource',
    function ($scope, CategoriesResource, TownsResource, AdsResource) {
        $scope.categories = CategoriesResource.all();
        $scope.towns = TownsResource.all();
        $scope.pageNum = 1;
        $scope.getAdsPage = getAdsPage;


        var pageAds = function () {
            AdsResource.all($scope.pageNum).then(
                function (data) {
                    $scope.ads = data.ads;
                    $scope.pagesArr = new Array(data.numPages);
                }
            )
        };
        pageAds();
        function getAdsPage(pageNum) {
            $scope.pageNum = pageNum;
            pageAds();
        }
    }]);
