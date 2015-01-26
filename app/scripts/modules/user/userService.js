/**
 * Home controller definition
 */
define(['./module'], function (module) {
  	'use strict';


	module.service('UserService', function ( $rootScope, $q, $state) {
		var userService = {};

		var user = $rootScope.user = {};

		userService.isLoggedIn = function(){
			if(typeof user.id != 'undefined'){
				return true;
			}else{
				return false;
			}
		};

		function handleLogin (username, password){
            var loginDeffer = $q.deffer();
            if(username == 'admin' && password == 'admin'){
                loginDeffer.resolve({name:'admin',roles:['admin']});
            }else{
                loginDeffer.reject('login error!');
            }
            return loginDeffer.promise();
		};

		return {
            handlelogin: handleLogin

        };
	});
});
