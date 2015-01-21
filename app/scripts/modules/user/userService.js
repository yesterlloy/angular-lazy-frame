/**
 * Home controller definition
 */
define(['./module'], function (module) {
  	'use strict';


	module.service('LoginService', function ( $rootScope, $q, $state) {
		var userService = {};

		var user = $rootScope.user = {};

		userService.isLoggedIn = function(){
			if(typeof user.id != 'undefined'){
				return true;
			}else{
				return false;
			}
		};

		userService.handleLogin = function(){
			$state.go('login');
			
		};

		return userService;
	});
});
