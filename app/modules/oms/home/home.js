define(['../module'], function(module){
	'use strict';


module.controller('HomeCtrl', ['$rootScope', '$scope', '$timeout',
    function($rootScope, $scope, $timeout)
    {
        $scope.message = 'I am home page in oms';

        $scope.gotoState = function(state) {
            // $state.go(state);
        };
    }]);

});