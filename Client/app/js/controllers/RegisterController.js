adsApp.controller('RegisterController', ['$scope', 'TownsResource', 'authentication', 'authorization', '$location', 'messaging',
    function ($scope, TownsResource, authentication, authorization, $location, messaging) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.passwordPattern = /^[\s\S]{2,100}$/;

        $scope.towns = TownsResource.all();

        $scope.register = function (user, userForm) {
            if (userForm.$valid) {
                authentication.register(user)
                    .then(
                    function (registerSuccessData) {
                        console.dir(registerSuccessData);
                        authorization.setLocalUser(registerSuccessData);
                        authorization.getAuthorizationHeaders();
                        messaging.successMessage('User account created. Please login!');
                        if (registerSuccessData.isAdmin) {
                            $location.path('/admin/home');
                        } else {
                            $location.path('/user/home');
                        }

                    },
                    function error(registerErrorData) {
                        console.dir(registerErrorData);
                    }
                )
            }
        };
    }]);