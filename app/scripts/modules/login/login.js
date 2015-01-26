/**
 * Home controller definition
 */
define([
    'angular',
    'authService'
], function (angular, Auth) {
    'use strict';

    var controller = function ($scope) {
        console.info('login controller',$scope);

        $scope.username = 'admin';
        $scope.password = 'admin';

        $scope.rememberme = true;
        $scope.login = function() {
            Auth.login({
                    username: $scope.username,
                    password: $scope.password,
                    rememberme: $scope.rememberme
                },
                function(res) {
                    $location.path('/');
                },
                function(err) {
                    $rootScope.error = "Failed to login";
                });
        };

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };

    }

    angular.module('app').controller('LoginCtrl',  ['$scope',  'principal', controller]);
});
