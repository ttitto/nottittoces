adsApp.controller('AdminCreateTownController', ['$scope', 'messaging', 'TownsResource', '$location',
    function ($scope, messaging, TownsResource, $location) {
        $scope.createTown = function createTown(town, createTownForm) {
            if (createTownForm.$valid) {
                TownsResource.adminCreateTown(town)
                    .then(
                    function createTownSuccess(createTownData) {
                        messaging.successMessage('New town was created successfully.')
                        $location.path('/admin/towns/list');
                    },
                    function createTownError(createTownErr) {
                        messaging.errorMessage('The new town couldn\'t be created.');
                        console.log(createTownErr);
                    }
                )
            } else {
                messaging.errorMessage('The form contains invalid data.');
            }
        }
    }]);