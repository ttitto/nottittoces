adsApp.controller('RegisterController', ['$scope', 'TownsResource',
    function ($scope, TownsResource) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.passwordPattern = /^[\s\S]{2,100}$/;

        $scope.towns = TownsResource.all();

        $scope.register = function (user, userForm) {
            // TODO: implement user registration
        };
    }]);