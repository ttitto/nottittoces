"use strict";

adsApp.factory('authorization', ['$q', function ($q) {
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

    function isUser() {
        if (this.isLogged()) {
            var loggedUser = this.getLocalUser();
            if (loggedUser.isAdmin === 'true') {
                return $q.reject('not authorized');
            } else {
                return true;
            }
        } else {
            return $q.reject('not authorized');
        }
    }

    function isAdmin() {
        if (this.isLogged()) {
            var loggedUser = this.getLocalUser();
            console.dir(loggedUser);
            console.dir(loggedUser.isAdmin);
            if (loggedUser.isAdmin === 'true') {
                return true
            }
        }

        return $q.reject('not authorized');
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
        isUser: isUser,
        isAdmin: isAdmin,
        getAuthorizationHeaders: getAuthorizationHeaders,
        removeAuthorizationHeaders: removeAuthorizationHeaders
    }
}]);
