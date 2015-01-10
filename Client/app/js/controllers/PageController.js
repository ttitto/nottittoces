adsApp.controller('PageController', ['$scope', 'authorization', 'authentication', '$location',
    function ($scope, authorization, authentication, $location) {
        $scope.authorization = authorization;
        $scope.authentication = authentication;
        $scope.location = $location;

        $scope.isNeededLocation = function (pattern) {
            pattern = new RegExp(pattern);
            return pattern.test($location.path());
        }
    }]);