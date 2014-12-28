adsApp.controller('RegisterController', ['$scope', 'TownsResource', 'authentication', 'authorization', '$location',
    function ($scope, TownsResource, authentication, authorization, $location) {
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
                        // TODO: show success message
                        $location.path('/');

                    },
                    function error(registerErrorData) {
                        console.dir(registerErrorData);
                    }
                )
            }
        };
    }]);