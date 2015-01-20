/**
 * Home controller definition
 */
define(['./module', './loginService'], function (module) {
    'use strict';

    module.controller('LoginController', function ($scope, $rootScope, UserService, $q) {
        var userService = $scope.userService = UserService;
        $scope.username='ad';
        $scope.password;
        $scope.handleLogin = function(){
            return $q(function(resolve, reject){
                var user = {};
                if($scope.username == 'admin' && $scope.password=='admin'){
                    user.username = $scope.username;
                    user.password = $scope.password;
                    user.id = 1;
                    $rootScope.user = user;
                    console.info('rootScope',$rootScope);
                    resolve(user);
                }else{
                    reject('not right');
                }
            });
        };
    });
});
