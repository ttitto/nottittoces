"use strict";

adsApp.factory('CategoriesResource', ['$resource', 'baseUrl', 'authorization',
    function ($resource, baseUrl, authorization) {
        var categoryResource = $resource(baseUrl + '/categories'),
            headers = authorization.getAuthorizationHeaders(),
            adminUrl = baseUrl + '/admin/categories',
            adminResource = $resource(adminUrl, null, {
                'adminListCategories': {method: 'GET', headers: headers}
            });

        return {
            all: function () {
                return categoryResource.query();
            },
            adminListCategories: function adminListCategories(requestParams){
                return adminResource.adminListCategories(requestParams).$promise;
            }
        }
    }]);
