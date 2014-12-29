adsApp.controller('PageController', ['$scope', 'authorization', 'authentication',
    function ($scope, authorization, authentication) {
        $scope.authorization = authorization;
        $scope.logout = function () {
            authentication.logout()
                .then(
                function logoutSuccess() {
                    console.log('logout succeeded!');
                },
                function logoutError(logoutErr) {
                    console.log(logoutErr);
                }
            )
        }
    }]);