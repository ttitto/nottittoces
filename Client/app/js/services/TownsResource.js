"use strict";

adsApp.factory('TownsResource', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    var townsResource = $resource(baseUrl + '/towns');

    return {
        all: function () {
            return townsResource.query();
        }
    }
}]);