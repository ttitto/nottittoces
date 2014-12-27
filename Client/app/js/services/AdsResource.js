"use strict";

adsApp.factory('AdsResource', ['$resource', 'baseUrl', 'pageSize', function ($resource, baseUrl, pageSize) {
    var adsResource = $resource(baseUrl + '/ads', null, {
        'getAll': {method: 'GET',
            params: {
                startPage: 'startPage',
                pageSize: pageSize,
                categoryId: '@categoryId',
                townId: '@townId'
            },
            isArray: false}
    });

    return {
        all: function (startPage, categoryId, townId) {
            return adsResource.getAll(
                {
                    startPage: startPage,
                    pageSize: pageSize,
                    categoryId: categoryId,
                    townId: townId
                }).$promise;
        }
    }
}]);
