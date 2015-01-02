"use strict";

adsApp.factory('AdsResource', ['$resource', 'baseUrl', 'pageSize', 'authorization',
    function ($resource, baseUrl, pageSize, authorization) {
        var userAdsUrl = baseUrl + '/user/ads',
            headers = authorization.getAuthorizationHeaders(),
            publicAdsResource = $resource(baseUrl + '/ads', null, {
                'getAll': {method: 'GET', isArray: false}
            }),
            userAdsResource = $resource(userAdsUrl, null, {
                'publishAd': {method: 'POST', headers: headers},
                'getUserAds': {method: 'GET', headers: headers},
                'deactivate': {url: userAdsUrl + '/deactivate/:id', method: 'PUT', params: {id: '@id'}, headers: headers},
                'publishAgain': {url: userAdsUrl + '/publishAgain/:id', method: 'PUT', params: {id: '@id'}, headers: headers}
            });

        return {
            all: function (adsRequestParams) {
                return publicAdsResource.getAll(adsRequestParams).$promise;
            },
            publishAd: function (ad) {
                return userAdsResource.publishAd(ad).$promise;
            },
            getUserAds: function (adsRequestParams) {
                return userAdsResource.getUserAds(adsRequestParams).$promise;
            },
            deactivate: function (id) {
                return userAdsResource.deactivate({id: id}).$promise;
            },
            publishAgain: function (id) {
                return userAdsResource.publishAgain({id: id}).$promise;
            }
        }
    }]);
