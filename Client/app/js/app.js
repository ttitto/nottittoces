var adsApp = angular.module('adsApp', ['ngResource', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        var routePermissions = {
            isUser: {
                authenticate: function (authorization) {
                    if (authorization.isUser() == true) {
                        return true;
                    } else {
                        return $q.reject('not authorized');
                    }
                }},
            isAdmin: {
                authenticate: function (authorization) {
                    if (authorization.isAdmin() == true) {
                        return true;
                    } else {
                        return $q.reject('not authorized');
                    }
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
                controller: 'UserAdsController',
                resolve: routePermissions.isUser
            })
            .when('/user/ads', {
                templateUrl: 'app/templates/user-ad.html',
                controller: 'UserAdsController',
                resolve: routePermissions.isUser
            })
            .when('/user/ads/publish', {
                templateUrl: 'app/templates/ad-publish-form.html',
                controller: 'AdPublishController',
                resolve: routePermissions.isUser
            })
            .when('/user/ads/edit/:id', {
                templateUrl: 'app/templates/ad-edit-form.html',
                controller: 'EditUserAdController',
                resolve: routePermissions.isUser
            })
            .when('/user/ads/delete/:id', {
                templateUrl: 'app/templates/user-confirm-delete-ad.html',
                controller: 'DeleteUserAdController',
                resolve: routePermissions.isUser
            })
            .when('/user/profile', {
                templateUrl: 'app/templates/user-edit-profile.html',
                controller: 'EditUserProfileController',
                resolve: routePermissions.isUser
            })
            .when('/admin/home', {
                templateUrl: 'app/templates/admin-ads.html',
                controller: 'AdminAdsController',
                resolve: routePermissions.isAdmin
            })
            .when('/admin/ads/edit/:id', {
                templateUrl: 'app/templates/admin-ad-edit-form.html',
                controller: 'EditAdminAdController',
                resolve: routePermissions.isAdmin
            })
            .when('/admin/ads/delete/:id', {
                templateUrl: 'app/templates/admin-confirm-delete-ad.html',
                controller: 'DeleteAdminAdController',
                resolve: routePermissions.isAdmin
            })
            .when('/admin/users/list', {
                templateUrl: 'app/templates/admin-list-users.html',
                controller: 'AdminListUsersController',
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

// TODO: bug with live preview in editing ad

