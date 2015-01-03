adsApp.controller('PageController', ['$scope', 'authorization', 'authentication', '$location',
    function ($scope, authorization, authentication, $location) {
        $scope.authorization = authorization;
        $scope.authentication = authentication;
        $scope.location = $location;
        $scope.isUserAdDelete = function () {
            return /^\/user\/ads\/delete.*$/.test($location.path())
        };
        $scope.isUserAdEdit = function () {
            return /^\/user\/ads\/edit.*$/.test($location.path())
        };
    }]);