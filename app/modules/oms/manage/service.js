define(['angularAMD'], function(angularAMD){
	'use strict';

	angularAMD.service('ManageService', function($q, $http){
	var manageService = {};
	var roles = [];


    manageService.permissions = [];
	manageService.savePermission = function(perm){
		console.info('savePermission',perm);
		var d = $q.defer();
		if(perm.id){
			var t = [];

			angular.forEach(manageService.permissions,function(p){
				if(p.id = perm.id){
					t.push(perm);
				}else{
					t.push(p);
				}
			});
			manageService.permissions = t;
			d.resolve(manageService.permissions);
		}else{
			if(perm.name == 'abc'){
				d.reject('save failed:name aready exist');
			}else{
				manageService.permissions.push(perm);
				d.resolve(permissions);
			}
		}
		
		return d.promise;
	};

	manageService.getPermissions = function(){
        var d = $q.defer();
		// /permissions
        setTimeout(function(){
            $http.get( 'api/permission.json?_=' + (new Date()).getTime() )
                .success(function(data){
                    manageService.permissions = data;
                    d.resolve(data);
                });
//            d.reject('no reason');

        },2000);
		return d.promise;
	}

	manageService.deletePermission = function(id){
        var d = $q.defer();
		var t = [];
			angular.forEach(manageService.permissions,function(p){
				if(p.id != id){
					t.push(p);
				}
			});
			manageService.permissions = t;
        setTimeout(function(){
            d.resolve(manageService.permissions);
//            d.reject('fail test');
        },2000);
        return d.promise;
	}

	return manageService;
});

});

