adsApp.service('UserResource', ['$resource', 'baseUrl', 'authorization',
    function ($resource, baseUrl, authorization) {
        var userProfileUrl = baseUrl + '/user/profile',
            adminUsersUrl = baseUrl + '/admin/users',
            headers = authorization.getAuthorizationHeaders(),
            userProfileResource = $resource(userProfileUrl, null, {
                'get': {method: 'GET', headers: headers},
                'editUserProfile': {method: 'PUT', headers: headers},
                'changeUserPassword': {url: baseUrl + '/user/changePassword', method: 'PUT', headers: headers}
            }),
            adminUsersResource = $resource(adminUsersUrl, null, {
                'adminListUsers': {method: 'GET', headers: headers},
                'adminGetUserById': {url: adminUsersUrl + '/:id', method: 'GET', headers: headers},
                'adminEditProfile': {url: baseUrl + '/admin/user/:userName', params: {userName: '@userName'}, method: 'PUT', headers: headers},
                'adminChangeUserPassword': {url: baseUrl + '/admin/setpassword', method: 'PUT', headers: headers},
                'adminDeleteUser': {url: baseUrl + '/admin/user/:userName', method: 'DELETE', params: {userName: '@userName'}, headers: headers}
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
            },
            adminListUsers: function adminListUsers(requestParams) {
                return adminUsersResource.adminListUsers(requestParams).$promise;
            },
            adminGetUserById: function adminGetUserById(id) {
                return adminUsersResource.adminGetUserById({id: id}).$promise;
            },
            adminEditProfile: function adminEditProfile(user) {
                return adminUsersResource.adminEditProfile(user).$promise;
            },
            adminChangeUserPassword: function adminChangeUserPassword(pass) {
                return adminUsersResource.adminChangeUserPassword(pass).$promise;
            },
            adminDeleteUser: function adminDeleteUser(user) {
                return adminUsersResource.adminDeleteUser(user).$promise;
            }
        }
    }]);