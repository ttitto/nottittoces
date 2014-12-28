adsApp.controller('LoginController', ['$scope', 'authentication', 'authorization', '$location',
    function ($scope, authentication, authorization, $location) {
        $scope.passwordPattern = /^[\s\S]{2,100}$/;

        $scope.login = function (user, userForm) {
            if (userForm.$valid) {
                authentication.login(user)
                    .then(
                    function (loginSuccessData) {
                        console.dir(loginSuccessData);
                        authorization.setLocalUser(loginSuccessData);
                        // TODO: show success message
                        $location.path('/');

                    },
                    function error(loginErrorData) {
                        console.dir(loginErrorData);
                    }
                )
            }
        };
    }]);