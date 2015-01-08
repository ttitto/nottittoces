adsApp.controller('AdminAdsController', ['$scope', 'messaging', 'AdsResource', '$location', 'pageSize', 'authorization',
    function ($scope, messaging, AdsResource, $location, pageSize, authorization) {
        $scope.requestParams = {startPage: 1, pageSize: 2};
        $scope.ads = [];

        $scope.getListedItems = function (requestParams) {
            AdsResource.getAdminAds(requestParams)
                .then(
                function getAdminAdsSuccess(adminAdsData) {
                    $scope.ads = adminAdsData.ads;
                    $scope.pagesArr = new Array(adminAdsData.numPages);
                },
                function getAdminAdsError(adminAdsError) {
                    console.log(adminAdsError);
                }
            )
        };

        $scope.getListedItems($scope.requestParams);

        $scope.rejectAd = function rejectAd(ad) {
            AdsResource.rejectAd(ad)
                .then(
                function rejectAdSuccess(rejectAdData) {
                    messaging.successMessage('Ad rejected successfully.');
                    $scope.getListedItems($scope.requestParams);
                },
                function rejectAdError(rejectAdErr) {
                    console.log(rejectAdErr);
                    messaging.errorMessage('Ad\'s status couldn\'t be changed to "Rejected"');
                }
            )
        };

        $scope.approveAd = function approveAd(ad) {
            AdsResource.approveAd(ad)
                .then(
                function approveAdSuccess(approveAdData) {
                    messaging.successMessage('Ad approved successfully.');
                    $scope.getListedItems($scope.requestParams);
                },
                function approveAdError(approveAdErr) {
                    console.log(approveAdErr);
                    messaging.errorMessage('Ad couldn\'t be approved.');
                }
            )
        }
    }]);