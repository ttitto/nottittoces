"use strict";

adsApp.factory('AdsResource', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    var adsResource = $resource(baseUrl + '/ads', null, {
        'getAll': {method:'GET', params:{startPage: '@startPage'}, isArray: false}
    });

    return {
        all: function (startPage) {
            return adsResource.getAll({startPage: startPage}).$promise;
        }
    }
}]);
