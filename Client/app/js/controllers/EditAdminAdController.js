"use strict";

adsApp.controller('EditAdminAdController', ['$scope', 'AdsResource', 'messaging', 'TownsResource', 'CategoriesResource', '$routeParams', '$location',
    function ($scope, AdsResource, messaging, TownsResource, CategoriesResource, $routeParams, $location) {
        $scope.towns = TownsResource.all();

        $scope.buttonName = 'Change image';

        AdsResource.getAdminAdById($routeParams.id)
            .then(
            function getAdminAdByIdSuccess(adData) {
                $scope.ad = adData;
                var dateComponents = adData.date.split(/[-,T]/);
                $scope.ad.date = dateComponents[0] + '-' + dateComponents[1] + '-' + dateComponents[2];
            },
            function getAdminAdByIdError(adError) {
                console.log(adError);
            }
        );
        $scope.editAd = function (ad, adEditForm) {
            if (adEditForm.$valid) {
                AdsResource.editAdminAd(ad)
                    .then(
                    function adminAdEditSuccess() {
                        messaging.successMessage('Advertisement edited. Don\'t forget to submit it for publishing;');
                        $location.path('/admin/home');
                    },
                    function adminAdEditError(adminAdEditError) {
                        messaging.errorMessage('Advertisement couldn\'t be edited.');
                        console.log(adminAdEditError);
                    }
                )
            }
        };
        $scope.getBase64 = function (base64String, attrs) {
            $scope.ad.imageDataUrl = base64String;
        };

        $scope.deleteImageUrl = function (ad) {
            $scope.getBase64(null);
        }
    }]);