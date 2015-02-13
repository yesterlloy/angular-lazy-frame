define(['angularAMD', 'AuthService'], function(angularAMD, AuthService){
    'use strict';

    angularAMD.controller('LoginCtrl',  ['$scope',  'AuthService', '$state', '$rootScope', 'AUTH_EVENTS', function($scope, AuthService, $state, $rootScope, AUTH_EVENTS){
        
        $scope.rememberme = true;
        $scope.credentials = {
            username: $scope.username,
            password: $scope.password,
            rememberme: $scope.rememberme
        };


        $scope.login = function () {
            AuthService.login($scope.credentials).then(function (user) {
                console.info('user',user);
                $scope.setCurrentUser(user);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };

        $scope.logout = function(){
            AuthService.logout().then(function(){
                $scope.setCurrentUser(null);
                $rootScope.$broadcast(AUTH_EVENTS.loginoutSuccess);
            }, function(){
                $rootScope.$broadcast(AUTH_EVENTS.loginoutFailed);
            })
        }

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    }]);
});

