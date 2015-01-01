"use strict";

adsApp.controller('AdPublishController', ['$scope', 'messaging', 'CategoriesResource', 'TownsResource', 'AdsResource', '$location',
    function ($scope, messaging, CategoriesResource, TownsResource, AdsResource, $location) {
        $scope.categories = CategoriesResource.all();
        $scope.towns = TownsResource.all();

        $scope.ad = {};

        $scope.getBase64 = function (base64String, attrs) {
            $scope.ad.imageDataUrl = base64String;
        };

        $scope.publishAd = function (ad, adForm) {
            AdsResource.publishAd(ad)
                .then(
                function adPublishingSuccess(adPublishedData) {
                    messaging.successMessage('Advertisement submitted for approval. Once approved, it will be published.')
                    $location.path('user/home');
                },
                function adPublishingError(adPublishedError) {
                    console.log(adPublishedError);
                    messaging.errorMessage('Advertisement couldn\'t be published.');
                }
            )
        }
    }]);