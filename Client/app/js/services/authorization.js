"use strict";

adsApp.factory('authorization', [function () {
    var headers = {};

    function getLocalUser() {
        var savedUser = JSON.parse(sessionStorage.getItem('userData'));
        if (savedUser) {
            return savedUser;
        } else {
            return false;
        }
    }

    function setLocalUser(user) {
        if (!!user) {
            var userStr = JSON.stringify(user);
            sessionStorage.setItem('userData', userStr);
        } else {
            sessionStorage.removeItem('userData');
        }
    }

    function isLogged() {
        return !!this.getLocalUser();
    }

    function setAuthorizationHeaders(accessToken) {
        angular.extend(headers, {Authorization: 'Bearer ' + accessToken});
    }

    function getAuthorizationHeaders() {
        var loggedUser = getLocalUser();
        if (loggedUser) {
            setAuthorizationHeaders(loggedUser.access_token);
        }

        return headers;
    }

    function removeAuthorizationHeaders() {
        delete headers['Authorization'];
    }

    return{
        getLocalUser: getLocalUser,
        setLocalUser: setLocalUser,
        isLogged: isLogged,
        getAuthorizationHeaders: getAuthorizationHeaders,
        removeAuthorizationHeaders: removeAuthorizationHeaders
    }
}]);
