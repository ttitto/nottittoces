var adsApp = angular.module('adsApp', ['ngResource', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/ads.html'
            })
    }])
    .constant('baseUrl', 'http://localhost:1337/api')
    .constant('pageSize', 3);
