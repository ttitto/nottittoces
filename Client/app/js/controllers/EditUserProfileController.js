adsApp.controller('EditUserProfileController', ['$scope', 'TownsResource', 'UserResource', 'messaging', '$location',
    function ($scope, TownsResource, UserResource, messaging, $location) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.passwordPattern = /^[\s\S]{2,100}$/;
        $scope.towns = TownsResource.all();
        $scope.user = UserResource.get();

        $scope.editUserProfile = function (user, userEditProfileForm) {
            if (userEditProfileForm.$valid) {
                UserResource.editUserProfile(user)
                    .then(
                    function userProfileEditSuccess(userProfileEditData) {
                        messaging.successMessage('User profile successfully updated.');
                        $location.path('/user/home');

                    },
                    function userProfileEditError(userProfileEditErr) {
                        messaging.errorMessage('User profile couldn\'t be updated.');
                        console.log(userProfileEditErr);
                    }
                )
            } else {
                messaging.errorMessage('The user form contains invalid data.');
            }
        };
        $scope.changeUserPassword = function (pass, userChangePasswordForm) {
            if (userChangePasswordForm.$valid) {
                UserResource.changeUserPassword(pass)
                    .then(
                    function changeUserPassSuccess(changeUserPassData) {
                        messaging.successMessage('The password was successfully changed');
                        $location.path('/user/home');
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