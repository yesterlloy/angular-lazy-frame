define(['../module'], function(module){
	'use strict';


module.controller('AdvHomeCtrl', ['$rootScope', '$scope', '$timeout',
    function($rootScope, $scope, $timeout)
    {
        $scope.message = 'I am home controller in adv system';

        $scope.gotoState = function(state) {
            // $state.go(state);
        };
    }]);

});