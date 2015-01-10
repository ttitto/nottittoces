adsApp.controller('AdminEditProfileController', ['$scope', 'messaging', 'UserResource', 'TownsResource', '$routeParams', '$location',
    function ($scope, messaging, UserResource, TownsResource, $routeParams, $location) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.passwordPattern = /^[\s\S]{2,100}$/;
        $scope.towns = TownsResource.all();

        UserResource.adminGetUserById($routeParams.id)
            .then(
            function adminGetUserByIdSuccess(adminGetUserByIdData) {
                $scope.user = adminGetUserByIdData;
            },
            function adminGetUserByIdError(adminGetUserByIdErr) {
                console.log(adminGetUserByIdErr);
            }
        );

        $scope.adminEditProfile = function adminEditProfile(user, adminEditProfileForm) {
            if (adminEditProfileForm.$valid) {
                UserResource.adminEditProfile(user)
                    .then(
                    function adminEditProfileSuccess() {
                        messaging.successMessage('User profile successfully updated.');
                        $location.path('/admin/users/list');

                    },
                    function adminEditProfileError(adminEditProfileErr) {
                        messaging.errorMessage('User profile couldn\'t be updated.');
                        console.log(adminEditProfileErr);
                    }
                )
            } else {
                messaging.errorMessage('The user form contains invalid data.');
            }
        };

        $scope.changeUserPassword = function (pass, adminChangePasswordForm) {
            if (adminChangePasswordForm.$valid) {
                var changePasswordRequest = {
                    username: $scope.user.userName,
                    newPassword: pass.newPassword,
                    confirmPassword: pass.confirmPassword
                };
                UserResource.adminChangeUserPassword(changePasswordRequest)
                    .then(
                    function changeUserPassSuccess(changeUserPassData) {
                        messaging.successMessage('The password was successfully changed');
                        $location.path('/admin/home');
                    },
                    function changeUserPassError(changeUserPassErr) {
                        messaging.errorMessage('The password couldn\'t be changed.');
                        console.log(changeUserPassErr);
                    }
                )
            } else {
                messaging.errorMessage('Tne user form contains invalid data.');
            }
        };
    }]);