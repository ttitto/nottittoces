"use strict";

adsApp.factory('CategoriesResource', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    var categoryResource = $resource(baseUrl + '/categories');

    return {
        all: function () {
            return categoryResource.query();
        }
    }
}]);
