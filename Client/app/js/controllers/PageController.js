adsApp.controller('PageController', ['$scope', 'authorization', 'authentication',
    function ($scope, authorization, authentication) {
        $scope.authorization = authorization;
        $scope.authentication = authentication;
    }]);