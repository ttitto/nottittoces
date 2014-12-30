adsApp.controller('LoginController', ['$scope', 'authentication', 'authorization', '$location', 'messaging',
    function ($scope, authentication, authorization, $location, messaging) {
        $scope.passwordPattern = /^[\s\S]{2,100}$/;

        $scope.login = function (user, userForm) {
            if (userForm.$valid) {
                authentication.login(user)
                    .then(
                    function (loginSuccessData) {
                        console.dir(loginSuccessData);
                        authorization.setLocalUser(loginSuccessData);
                        $location.path('/user/home');
                    },
                    function error(loginErrorData) {
                        console.dir(loginErrorData);
                        messaging.errorMessage('Invalid login.');
                    }
                )
            }
        };
    }]);