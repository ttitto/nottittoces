adsApp.controller('DeleteAdminAdController', ['$scope', 'AdsResource', 'messaging', '$routeParams', 'CategoriesResource', 'TownsResource', '$location',
    function ($scope, AdsResource, messaging, $routeParams, CategoriesResource, TownsResource, $location) {

        AdsResource.getAdminAdById($routeParams.id)
            .then(
            function success(adData) {
                $scope.ad = adData;
                CategoriesResource.all().$promise.then(
                    function (categories) {
                        $.each(categories, function (index, category) {
                            if (category.id == adData.categoryId) {
                                $scope.ad.category = category.name;
                            }
                        });
                    }
                );

                TownsResource.all().$promise.then(
                    function (towns) {
                        $.each(towns, function (index, town) {
                            if (town.id == adData.townId) {
                                $scope.ad.town = town.name;
                            }
                        });
                    }
                );
            },
            function error(err) {
                console.log(err);
                messaging.errorMessage('Advertisment data couldn\'t be received');
            }
        );

        $scope.deleteAdminAd = function (ad) {
            AdsResource.deleteAdminAd(ad)
                .then(
                function adDeleteSuccess(adDeleteData) {
                    messaging.successMessage('Advertisement deleted successfully.');
                    $location.path('/admin/home');
                },
                function adDeleteError(adDeleteErr) {
                    messaging.errorMessage('Advertisement couldn\'t be deleted.');
                    console.log(adDeleteErr);
                }
            )
        }
    }]);