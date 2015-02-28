define(['angularAMD', 'AuthService'], function(angularAMD, AuthService){
    'use strict';

    angularAMD.controller('LoginCtrl',  ['$scope',  'AuthService', '$state', '$rootScope', 'AUTH_EVENTS', function($scope, AuthService, $state, $rootScope, AUTH_EVENTS){
        
        $scope.rememberme = true;
        $scope.loading = false;

        $scope.username = 'admin';
        $scope.password = '123456';


        $scope.credentials = {
            username: $scope.username,
            password: $scope.password,
            rememberme: $scope.rememberme
        };


        $scope.login = function () {

            $scope.loading = true;

            AuthService.login($scope.credentials).then(function (user) {
                console.info('user',user);
                $scope.setCurrentUser(user);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }, function () {
                $scope.loading = false;
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

        $scope.cancel = function(){
            $scope.loading = false;
        }

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    }]);


    /*
     var opts = {
     lines: 13, // The number of lines to draw
     length: 20, // The length of each line
     width: 10, // The line thickness
     radius: 30, // The radius of the inner circle
     corners: 1, // Corner roundness (0..1)
     rotate: 0, // The rotation offset
     direction: 1, // 1: clockwise, -1: counterclockwise
     color: '#000', // #rgb or #rrggbb or array of colors
     speed: 1, // Rounds per second
     trail: 60, // Afterglow percentage
     shadow: false, // Whether to render a shadow
     hwaccel: false, // Whether to use hardware acceleration
     className: 'spinner', // The CSS class to assign to the spinner
     zIndex: 2e9, // The z-index (defaults to 2000000000)
     top: '50%', // Top position relative to parent
     left: '50%' // Left position relative to parent
     };
     */
});

