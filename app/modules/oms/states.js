define([
	'angularAMD',
	'Session'
], function(angularAMD, Session){

	'use strict';

	// console.log('oms module Session,ngDialog', Session, ngDialog);


	var oms = angular.module('oms', ['star.session', 'ui.router', 'ngDialog']);
	console.log('oms module',oms);



	oms.config(['$stateProvider', '$starSessionProvider', function($stateProvider, $starSessionProvider, $scope){
		console.log('oms states Session',$starSessionProvider.getSession());

		var session = $starSessionProvider.getSession();
		var defaultState = '';


		var stateFactory = {
			
			"site.oms": {
				name: 'site.oms',
		        url: '/oms',
		        views: {
		          
		            "leftnav": {
		                templateUrl: "public/layout/leftnav.html",
		                controller: "LeftnavCtrl"
		            },
		            "topnav": {
		                templateUrl: "public/layout/topnav.html",
		                controller: "TopnavCtrl"
		            }
		        },
		        data: {
		        	authorizedRoles: [session.userRole]
		        },
		        // controller: function($state, defaultState){
		        // 	console.log('defaultState', defaultState);
		        // 	$state.go(defaultState);

		        // },
		        // resolve: {
		        // 	defaultState: function(){
		        // 		console.log('site.oms.resolve ', defaultState);
		        // 		return defaultState;
		        // 	}
		        // }
		    },
			"site.oms.home": {
				name: 'site.oms.home',
		        url:'/home',
		        views: {
		            "content@site": {
		                templateUrl: "modules/oms/home/home.html",
		                controller: "HomeCtrl"
		            }
		        }
		    },
			"site.oms.manage": {
				name: "site.oms.manage",
				url: "/manage",
				
			} ,
			"site.oms.manage.permission": {
				name: "site.oms.manage.permission",
				url: "/permission",
				views: {
					"content@site": {
						templateUrl: "modules/oms/manage/permission.html",
						controller: "PermissionCtrl"
					}
				}
			},
			"site.oms.manage.role": {
				name: "site.oms.manage.role",
				url: "/role",
				views: {
					"content@site": {
						templateUrl: "modules/oms/manage/role.html",
						controller: "RoleCtrl"
					}
				}
				
			}
		};

		angular.forEach(session.systems, function(sys){
			
			// console.log('sys', stateFactory['site.' + sys.name]);

			$stateProvider.state(stateFactory['site.' + sys.name]);

			if( sys.modules.length > 0 ){
				angular.forEach(sys.modules, function(module, i){
					if( i == 0 ){
						defaultState = 'site.' + module.name;
					}

					// console.log('module', stateFactory['site.' + module.name]);
					$stateProvider.state(stateFactory['site.' + module.name]);

					if( module.controllers.length > 0 ){
						angular.forEach(module.controllers, function(ctrl){
							// console.log('module ctrl', stateFactory['site.' + ctrl.name]);

							$stateProvider.state(stateFactory['site.' + ctrl.name]);
						});
					}
				});
			}
			
		});

	}]);
	
	return oms;
});