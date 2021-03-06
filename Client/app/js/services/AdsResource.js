"use strict";

adsApp.factory('AdsResource', ['$resource', 'baseUrl', 'pageSize', 'authorization',
    function ($resource, baseUrl, pageSize, authorization) {
        var userAdsUrl = baseUrl + '/user/ads',
            adminAdsUrl = baseUrl + '/admin/ads',
            headers = authorization.getAuthorizationHeaders(),
            publicAdsResource = $resource(baseUrl + '/ads', null, {
                'getAll': {method: 'GET', isArray: false}
            }),
            userAdsResource = $resource(userAdsUrl, null, {
                'publishAd': {method: 'POST', headers: headers},
                'getUserAds': {method: 'GET', headers: headers},
                'deactivate': {url: userAdsUrl + '/deactivate/:id', method: 'PUT', params: {id: '@id'}, headers: headers},
                'publishAgain': {url: userAdsUrl + '/publishAgain/:id', method: 'PUT', params: {id: '@id'}, headers: headers},
                'getById': {url: userAdsUrl + '/:id', method: 'GET', headers: headers},
                'editUserAd': {url: userAdsUrl + '/:id', method: 'PUT', params: {id: '@id'}, headers: headers},
                'deleteUserAd': {url: userAdsUrl + '/:id', method: 'DELETE', params: {id: '@id'}, headers: headers}
            }),
            adminAdsResource = $resource(adminAdsUrl, null, {
                'getAdminAds': {method: 'GET', headers: headers},
                'rejectAd': {url: adminAdsUrl + '/reject/:id', method: 'PUT', params: {id: '@id'}, headers: headers},
                'approveAd': {url: adminAdsUrl + '/approve/:id', method: 'PUT', params: {id: '@id'}, headers: headers},
                'getAdminAdById': {url: adminAdsUrl + '/:id', method: 'GET', headers: headers },
                'editAdminAd': {url: adminAdsUrl + '/:id', method: 'PUT', params: {id: '@id'}, headers: headers},
                'deleteAdminAd': {url: adminAdsUrl + '/:id', method: 'DELETE', params: {id: '@id'}, headers: headers}
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
            },
            getById: function (id) {
                return userAdsResource.getById({id: id}).$promise;
            },
            editUserAd: function (ad) {
                return userAdsResource.editUserAd(ad).$promise;
            },
            deleteUserAd: function (ad) {
                return userAdsResource.deleteUserAd({id: ad.id}).$promise;
            },
            getAdminAds: function (adsRequestParams) {
                return adminAdsResource.getAdminAds(adsRequestParams).$promise;
            },
            rejectAd: function rejectAd(ad) {
                return adminAdsResource.rejectAd({id: ad.id}).$promise;
            },
            approveAd: function approveAd(ad) {
                return adminAdsResource.approveAd({id: ad.id}).$promise;
            },
            getAdminAdById: function getAdminAdById(id) {
                return adminAdsResource.getAdminAdById({id: id}).$promise;
            },
            editAdminAd: function editAdminAd(ad) {
                return adminAdsResource.editAdminAd(ad).$promise;
            },
            deleteAdminAd: function (ad) {
                return adminAdsResource.deleteAdminAd({id: ad.id}).$promise;
            }
        }
    }])
;
