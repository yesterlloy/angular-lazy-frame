define([

    'angular'

], function(angular) {

    'use strict';

    var controller = function($rootScope, $scope, $state, $timeout) {
		$scope.message = 'I am home controller';

		$scope.gotoState = function(state) {
			$state.go(state);
		};
    };    

    angular.module('app').controller('HomeCtrl', ['$rootScope', '$scope', '$state', '$timeout', controller]);
});