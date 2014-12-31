var adsApp = angular.module('adsApp', ['ngResource', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        var routePermissions = {
            isUser: {
                authenticate: function (authorization) {
                    return authorization.isUser();
                }},
            isAdmin: {
                authenticate: function (authorization) {
                    return authorization.isAdmin();
                }
            }

        };
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
            .when('/user/home', {
                templateUrl: 'app/templates/ads.html',
                controller: 'AdsController',
                resolve: routePermissions.isUser
            })
            .when('/user/ads/publish', {
                templateUrl: 'app/templates/ad-publish-form.html',
                controller: 'AdPublishController',
                resolve: routePermissions.isUser
            })
            .when('/admin/home', {
                templateUrl: 'app/templates/ads.html',
                controller: 'AdsController',
                resolve: routePermissions.isAdmin
            })
            .when('/unauthorized', {
                template: '<div><p>Your request was rejected. You might not be authorized to view this content. Please log in!</p></div>'
            })
                .otherwise({ redirectTo: '/' });
    }])
    .run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            $location.path('/unauthorized');
        })
    })
    .constant('baseUrl', 'http://localhost:1337/api')
    .constant('pageSize', 3);
// TODO: implement directives for towns and categories selects
// TODO: implement publishing ad template and functionality
// TODO: create a PageController to change the header content
