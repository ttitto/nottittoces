adsApp.controller('AdminDeleteTownController', ['$scope', 'messaging', 'TownsResource', '$location', '$routeParams',
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

        $scope.deleteTown = function deleteTown(town, deleteTownForm) {
            if (deleteTownForm.$valid) {
                TownsResource.adminDeleteTown(town)
                    .then(
                    function deleteTownSuccess(deleteTownData) {
                        messaging.successMessage('The town was deleted successfully.');
                        $location.path('/admin/towns/list');
                    },
                    function deleteTownError(deleteTownErr) {
                        messaging.errorMessage('The selected town couldn\'t be deleted.');
                        console.log(deleteTownErr);
                    }
                )
            } else {
                messaging.errorMessage('The form contains invalid data.');
            }
        }
    }]);