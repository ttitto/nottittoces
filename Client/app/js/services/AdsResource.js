"use strict";

adsApp.factory('AdsResource', ['$resource', 'baseUrl', 'pageSize', 'authorization',
    function ($resource, baseUrl, pageSize, authorization) {
        var userAdsUrl = baseUrl + '/user/ads',
            headers = authorization.getAuthorizationHeaders(),
            publicAdsResource = $resource(baseUrl + '/ads', null, {
                'getAll': {method: 'GET', isArray: false}
            }),
            userAdsResource = $resource(userAdsUrl, null, {
                'publishAd': {method: 'POST', headers: headers}
            });

        return {
            all: function (adsRequestParams) {
                return publicAdsResource.getAll(adsRequestParams).$promise;
            },
            publishAd: function (ad) {
                return userAdsResource.publishAd(ad).$promise;
            }
        }
    }]);
