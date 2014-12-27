"use strict";

adsApp.factory('AdsResource', ['$resource', 'baseUrl', 'pageSize', function ($resource, baseUrl, pageSize) {
    var adsResource = $resource(baseUrl + '/ads', null, {
        'getAll': {method: 'GET', isArray: false}
    });

    return {
        all: function (adsRequestParams) {
            return adsResource.getAll(adsRequestParams).$promise;
        }
    }
}]);
