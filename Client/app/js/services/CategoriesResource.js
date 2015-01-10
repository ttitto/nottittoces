"use strict";

adsApp.factory('CategoriesResource', ['$resource', 'baseUrl', 'authorization',
    function ($resource, baseUrl, authorization) {
        var headers = authorization.getAuthorizationHeaders(),
            categoriesUrl = baseUrl + '/categories',
            adminUrl = baseUrl + '/admin/categories',
            categoryResource = $resource(categoriesUrl, null, {
                'getById': {url: categoriesUrl + '/:id', method: 'GET'}
            }),
            adminResource = $resource(adminUrl, null, {
                'adminListCategories': {method: 'GET', headers: headers},
                'adminCreateCategory': {method: 'POST', headers: headers},
                'adminEditCategory': {method: 'PUT', params: {id: '@id'}, headers: headers}
            });

        return {
            all: function () {
                return categoryResource.query();
            },
            getById: function getById(id) {
                return categoryResource.getById({id: id}).$promise;
            },
            adminListCategories: function adminListCategories(requestParams) {
                return adminResource.adminListCategories(requestParams).$promise;
            },
            adminCreateCategory: function adminCreateCategory(category) {
                return adminResource.adminCreateCategory(category).$promise;
            },
            adminEditCategory: function adminCreateCategory(category) {
                return adminResource.adminEditCategory(category).$promise;
            }
        }
    }]);
