adsApp.service('UserResource', ['$resource', 'baseUrl', 'authorization',
    function ($resource, baseUrl, authorization) {
        var userProfileUrl = baseUrl + '/user/profile',
            headers = authorization.getAuthorizationHeaders(),
            userProfileResource = $resource(userProfileUrl, null, {
                'get': {method: 'GET', headers: headers},
                'editUserProfile': {method: 'PUT', headers: headers},
                'changeUserPassword': {url: baseUrl + '/user/changePassword', method: 'PUT', headers: headers}
            });


        return {
            get: function () {
                return userProfileResource.get()
            },
            editUserProfile: function (user) {
                return userProfileResource.editUserProfile(user).$promise;
            },
            changeUserPassword: function (password) {
                return userProfileResource.changeUserPassword(password).$promise;
            }
        }
    }]);