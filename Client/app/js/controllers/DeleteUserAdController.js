adsApp.controller('DeleteUserAdController', ['$scope', 'AdsResource', 'messaging', '$routeParams', 'CategoriesResource', 'TownsResource',
    function ($scope, AdsResource, messaging, $routeParams, CategoriesResource, TownsResource) {
        var categories = CategoriesResource.all();
        var towns = TownsResource.all();

        AdsResource.getById($routeParams.id)
            .then(
            function success(adData) {
                $scope.ad = adData;

                $.each(towns, function (index, town) {
                    if (town.id == adData.townId) {
                        $scope.ad.town = town.name;
                    }
                });
                $.each(categories, function (index, category) {
                    if (category.id == adData.categoryId) {
                        $scope.ad.category = category.name;
                    }
                });
            },
            function error(err) {
                console.log(err);
                messaging.errorMessage('Advertisment data couldn\'t be received');
            }
        );

        $scope.deleteUserAd = function (ad) {
            AdsResource.deleteUserAd(ad)
                .then(
                function adDeleteSuccess(adDeleteData) {
                    messaging.successMessage('Advertisement deleted successfully.');
                },
                function adDeleteError(adDeleteErr) {
                    messaging.errorMessage('Advertisement couldn\'t be deleted.');
                    console.log(adDeleteErr);
                }
            )
        }
    }]);