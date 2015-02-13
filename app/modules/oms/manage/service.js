define(['angularAMD'], function(angularAMD){
	'use strict';

	angularAMD.service('ManageService', function($q){
	var manageService = {};
	var permissions = [];
	var roles = [];

	permissions = [
	{
		id: 1,
		name: 'abc点点滴滴',
		method: 'aaa',
		operation: 'sddd'
	},
	{
		id: 2,
		name: 'abc',
		method: 'aaa',
		operation: 'sddd'
	},{
		id: 3,
		name: 'abc',
		method: 'aaa',
		operation: 'sddd'
	},{
		id: 4,
		name: 'abc',
		method: 'aaa',
		operation: 'sddd'
	}
	];

	manageService.savePermission = function(perm){
		console.info('savePermission',perm);
		var d = $q.defer();
		if(perm.id){
			var t = [];

			angular.forEach(permissions,function(p){
				if(p.id = perm.id){
					t.push(perm);
				}else{
					t.push(p);
				}
			});
			permissions = t;
			d.resolve(permissions);
		}else{
			if(perm.name == 'abc'){
				d.reject('save failed:name aready exist');
			}else{
				permissions.push(perm);
				d.resolve(permissions);
			}
		}
		
		return d.promise;
	};

	manageService.getPermissions = function(){
		// /permissions
		return permissions;
	}

	manageService.deletePermission = function(id){
		var t = [];
			angular.forEach(permissions,function(p){
				if(p.id = perm.id){
					t.push(perm);
				}else{
					t.push(p);
				}
			});
			permissions = t;
			d.resolve(permissions);
	}

	return manageService;
});

});

