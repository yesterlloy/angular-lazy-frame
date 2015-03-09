define(['angularAMD'], function(angularAMD){
	'use strict';

	angularAMD.service('AppsService', function($q, $http){
	var appsService = {};


    appsService.apps = [];
	appsService.saveItem = function(perm){
		var d = $q.defer();
		if(perm.id){
			var t = [];

			angular.forEach(appsService.apps,function(p){
				if(p.id = perm.id){
					t.push(perm);
				}else{
					t.push(p);
				}
			});
			appsService.apps = t;
			d.resolve(appsService.apps);
		}else{
			if(perm.name == 'abc'){
				d.reject('save failed:name aready exist');
			}else{
				appsService.apps.push(perm);
				d.resolve(permissions);
			}
		}
		
		return d.promise;
	};

	appsService.getList = function(){
//        var d = $q.defer();
		// /permissions
//        setTimeout(function(){
//            $http.get( 'api/permission.json?_=' + (new Date()).getTime() )
//                .success(function(data){
//                    appsService.apps = data;
//                    d.resolve(data);
//                });

//        },2000);
//        return d.promise;

        return $http({
            url: 'http://api.oms.com/admin/apps/list',
            method: "GET",
            headers: {
                 'Authorization': 'Basic fdfwoeigjiewoe',
                 'Content-Type': 'application/x-www-form-urlencoded'
             },
            withCredentials: true
        }) ;
	}

	appsService.deleteItem= function(id){
        var d = $q.defer();
		var t = [];
			angular.forEach(appsService.apps,function(p){
				if(p.id != id){
					t.push(p);
				}
			});
			appsService.apps = t;
        setTimeout(function(){
            d.resolve(appsService.apps);
//            d.reject('fail test');
        },2000);
        return d.promise;
	}

	return appsService;
});

});

