adsApp.controller('UserAdsController', ['$scope', 'messaging', 'AdsResource', '$location', 'pageSize',
    function ($scope, messaging, AdsResource, $location, pageSize) {
        $scope.requestParams = {startPage: 1, pageSize: pageSize};

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
    }]);