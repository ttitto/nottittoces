"use strict";

adsApp.factory('authentication', ['$http', 'authorization', 'baseUrl', '$q',
    function ($http, authorization, baseUrl, $q) {
        var userServiceUrl = baseUrl + '/user';

        function register(user) {
            var d = $q.defer();

            $http.post(userServiceUrl + '/register', user)
                .success(function (userRegistrationData) {
                    d.resolve(userRegistrationData);
                })
                .error(function (registrationErr) {
                    d.reject(registrationErr);
                });

            return d.promise;
        }

        return{
            register: register
        }
    }]);
