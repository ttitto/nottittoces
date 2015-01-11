"use strict";

adsApp.controller('EditUserAdController', ['$scope', 'AdsResource', 'messaging', 'TownsResource', 'CategoriesResource', '$routeParams', '$location',
    function ($scope, AdsResource, messaging, TownsResource, CategoriesResource, $routeParams, $location) {
        $scope.towns = TownsResource.all();

        $scope.buttonName = 'Change image';

        AdsResource.getById($routeParams.id)
            .then(
            function getAdByIdSuccess(adData) {
                $scope.ad = adData;
            },
            function getAdByIdError(adError) {
                console.log(adError);
            }
        );
        $scope.editAd = function (ad, adEditForm) {
            if (adEditForm.$valid) {
                AdsResource.editUserAd(ad)
                    .then(
                    function adEditSuccess() {
                        messaging.successMessage('Advertisement edited. Don\'t forget to submit it for publishing;');
                        $location.path('/user/ads');
                    },
                    function adEditError(adEditError) {
                        messaging.errorMessage('Advertisement couldn\'t be edited.');
                        console.log(adEditError);
                    }
                )
            }
        };
        $scope.getBase64 = function (base64String, attrs) {
            $scope.ad.imageDataUrl = base64String;
        };

        $scope.deleteImageUrl = function (ad) {
            $scope.getBase64(null);
            $('#base64-string').val(null);
        }
    }]);