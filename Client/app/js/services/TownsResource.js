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
                'adminCreateTown': {method: 'POST', headers: headers},
                'adminEditTown': {method: 'PUT', params: {id: '@id'}, headers: headers},
                'adminDeleteTown': {method: 'DELETE', headers: headers}
            });

        return {
            all: function () {
                return townsResource.query();
            },
            getById: function getById(id) {
                return townsResource.getById({id: id}).$promise;
            },
            adminListTowns: function adminListTowns(requestParams) {
                return adminResource.adminListTowns(requestParams).$promise;
            },
            adminCreateTown: function adminCreateTown(town) {
                return adminResource.adminCreateTown(town).$promise;
            },
            adminEditTown: function adminCreateTown(town) {
                return adminResource.adminEditTown(town).$promise;
            },
            adminDeleteTown: function adminDeleteTown(town) {
                return adminResource.adminDeleteTown({name: town}).$promise;
            }
        }
    }]);