/**
 * Home controller definition
 */
define(['angular', 'modules/user/userService', 'principal'], function (angular, UserService, principal) {
    'use strict';

    var controller = function ($scope, $state, principal) {
        console.info('login controller',$scope);

        var userSevice = $scope.userService = UserSevice;
        $scope.username = '';
        $scope.password = '';




        $scope.login = function(){

            userService.handleLogin($scope.username,$scope.password).then();

            // here, we fake authenticating and give a fake user
            principal.authenticate({
                name: $scope.username,
                roles: ['admin']
            });

            if ($scope.returnToState)
                $state.go($scope.returnToState.name, $scope.returnToStateParams);
            else
                $state.go('home');


        };
    }

    angular.module('app').controller('LoginCtrl',  ['$scope', '$state', 'principal', controller]);
});
