adsApp.controller('AdminDeleteUserController', ['$scope', 'messaging', 'UserResource', '$routeParams', '$location',
    function ($scope, messaging, UserResource, $routeParams, $location) {
        UserResource.adminGetUserById($routeParams.id)
            .then(
            function adminGetUserByIdSuccess(adminGetUserByIdData) {
                $scope.user = adminGetUserByIdData;
            },
            function adminGetUserByIdError(adminGetUserByIdErr) {
                console.log(adminGetUserByIdErr);
            }
        );

        $scope.adminDeleteUser = function adminDeleteUser(user) {
            UserResource.adminDeleteUser(user)
                .then(
                function adminDeleteUserSuccess(adminDeleteUserData) {
                    messaging.successMessage('The user and all its advertisements were deleted successfully.');
                    $location.path('/admin/users/list');
                },
                function adminDeleteUserError(adminDeleteUserErr) {
                    console.log(adminDeleteUserErr);
                    messaging.errorMessage('The user couldn\'t be deleted.');
                }
            )
        }
    }]);