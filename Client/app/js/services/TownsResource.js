"use strict";

adsApp.factory('TownsResource', ['$resource', 'baseUrl', 'authorization',
    function ($resource, baseUrl, authorization) {
        var headers = authorization.getAuthorizationHeaders(),
            townsUrl = baseUrl + '/towns',
            adminUrl = baseUrl + '/admin/towns',
            townsResource = $resource(baseUrl + '/towns', null, {
                'getById': {url: townsUrl + '/:id', method: 'GET'}
            }),
            adminResource = $resource(adminUrl, null, {
                'adminListTowns': {method: 'GET', headers: headers},
                'adminCreateTown': {method: 'POST', headers: headers}
            });

        return {
            all: function () {
                return townsResource.query();
            },
            getById: function getById(id) {
                return townsResource.getById({id: id}).$promise;
            },
            adminListCategories: function adminListCategories(requestParams) {
                return adminResource.adminListTowns(requestParams).$promise;
            },
            adminCreateCategory: function adminCreateCategory(town) {
                return adminResource.adminCreateTown(town).$promise;
            }
        }
    }]);