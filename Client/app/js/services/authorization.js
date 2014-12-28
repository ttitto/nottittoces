"use strict";

adsApp.factory('authorization', [function () {
    var headers = {};

    function getLocalUser() {
        var savedUser = sessionStorage.getItem('userData');
        if (savedUser) {
            return savedUser;
        }
    }

    function setLocalUser(user) {
        sessionStorage.setItem('userData', user);
    }

    function isLogged() {
        return !!this.getLocalUser();
    }

    function setAuthorizationHeaders(accessToken) {
        angular.extend(headers, {Authorization: 'Bearer + ' + accessToken});
    }

    function getAuthorizationHeaders() {
        var loggedUser = getLocalUser();
        if (loggedUser) {
            setAuthorizationHeaders(loggedUser.accessToken);
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
