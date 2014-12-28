var adsApp = angular.module('adsApp', ['ngResource', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/ads.html'
            })
            .when('/register', {
                templateUrl: 'app/templates/register-form.html'
            })
            .when('/login', {
                templateUrl: 'app/templates/login-form.html'
            })
    }])
    .constant('baseUrl', 'http://localhost:1337/api')
    .constant('pageSize', 3);
// TODO: implement logout
// TODO: implement filtering of the ads in the home page
// TODO: implement messaging system for errors and success
// TODO: take a look at responsive design
// TODO: create a PageController to change the header content
