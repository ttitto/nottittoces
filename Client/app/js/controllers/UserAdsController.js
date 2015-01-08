adsApp.controller('UserAdsController', ['$scope', 'messaging', 'AdsResource', '$location', 'pageSize', 'authorization',
    function ($scope, messaging, AdsResource, $location, pageSize, authorization) {
        $scope.requestParams = {startPage: 1, pageSize: pageSize};
        $scope.ads = [];

        $scope.getListedItems = function (requestParams) {
            AdsResource.getUserAds(requestParams)
                .then(
                function getUserAdsSuccess(userAdsData) {
                    $scope.ads = userAdsData.ads;
                    $scope.pagesArr = new Array(userAdsData.numPages);
                },
                function getUserAdsError(userAdsError) {
                    console.log(userAdsError);
                }
            )
        };

        $scope.getListedItems($scope.requestParams);

        $scope.deactivateAd = function (ad) {
            AdsResource.deactivate(ad.id)
                .then(
                function adDeativateSuccess(adDeactivateData) {
                    messaging.successMessage('Ad was deactivated successfully');
                    $scope.getListedItems($scope.requestParams);
                },
                function adDeactivateError(adDeactivateError) {
                    console.log(adDeactivateError);
                    messaging.errorMessage('Ad couldn\'t be deactivated.');
                }
            )
        };

        $scope.publishAgain = function (ad) {
            AdsResource.publishAgain(ad.id)
                .then(
                function publishAgainSuccess(publishAgainData) {
                    messaging.successMessage('The ad was published successfully again.');
                    $scope.getListedItems($scope.requestParams);
                },
                function publishAgainError(publishAgainError) {
                    console.log(publishAgainError);
                    messaging.errorMessage('The ad couldn\'t be published again.');
                }
            )
        };
    }]);