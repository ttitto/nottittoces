adsApp.controller('AdminEditTownController', ['$scope', 'messaging', 'TownsResource', '$location', '$routeParams',
    function ($scope, messaging, TownsResource, $location, $routeParams) {
        $scope.town = {};

        TownsResource.getById($routeParams.id)
            .then(
            function getTownByIdSuccess(getTownByIdData) {
                $scope.town = getTownByIdData;
            },
            function getTownByIdError(getTownByIdErr) {
                console.log(getTownByIdErr);
                messaging.errorMessage('The selected town couldn\'t be downloaded from the server.');
            }
        );

        $scope.editTown = function editTown(town, editTownForm) {
            if (editTownForm.$valid) {
                TownsResource.adminEditTown(town)
                    .then(
                    function editTownSuccess(editTownData) {
                        messaging.successMessage('The town was edited successfully.');
                        $location.path('/admin/towns/list');
                    },
                    function editTownError(editTownErr) {
                        messaging.errorMessage('The selected town couldn\'t be edited.');
                        console.log(editTownErr);
                    }
                )
            } else {
                messaging.errorMessage('The form contains invalid data.');
            }
        }
    }]);