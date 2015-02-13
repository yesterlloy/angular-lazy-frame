define(['../states', './service'], function(module){
	'use strict';
console.log('module',module);
	module.controller('PermissionCtrl', ['$scope', 'ManageService', 'ngDialog', function($scope, ManageService, ngDialog){

		var permissionsCtrl = $scope.permissionsCtrl = {};
		var permissions = $scope.permissions = ManageService.getPermissions();

		permissionsCtrl.createNew = function(){
			console.info('createNew',ngDialog);
			var ngdialog = ngDialog.open({
				template: 'modules/oms/manage/permissionEdit.html',
				data: {title:"添加权限",perm:{}},
				controller:'PermissionEditCtrl'
			});

			// ngdialog.closePromise.then(function(data){
			// 	console.info('closePromise',data);
			// 	ManageService.savePermission(data);
			// });
		};


		permissionsCtrl.editItem = function(perm){
			var ngdialog = ngDialog.open({
				template: 'modules/oms/manage/permissionEdit.html',
				data: {title:"编辑权限",perm:perm},
				controller:'PermissionEditCtrl'
			});

			ngdialog.closePromise.then(function(data){
				ManageService.savePermission(data);
			});
		};

		permissionsCtrl.deleteItem = function(){

		};
		
	}]);

});