define(['../module', './service', 'utils'], function(module){
	'use strict';
	module.controller('AppsCtrl', ['$scope', 'AppsService', 'ngDialog', 'usSpinnerService', 'StarsUtils',
        function($scope, AppsService, ngDialog, usSpinnerService, StarsUtils){

        $scope.loading_list = true;
        $scope.processing_delete = false;
        $scope.search_error = false;

		var appsCtrl = $scope.appsCtrl = {};
		var apps = $scope.apps = [];

        AppsService.getList().then(function(data){
            console.log('apps list data',data);
            AppsService.apps = data.data.data.rows;
            $scope.loading_list = false;
            $scope.apps = data.data.data.rows;
            console.log('getlist',$scope.apps);
        },function(data){
            $scope.loading_list = false;
            alert('error');
        });

		appsCtrl.createNew = function(){
			console.info('createNew',ngDialog);
			var ngdialog = ngDialog.open({
				template: 'modules/oms/manage/permissionEdit.html',
				data: {title:"添加权限",perm:{}},
				controller:'PermissionEditCtrl'
			});

			// ngdialog.closePromise.then(function(data){
			// 	console.info('closePromise',data);
			// 	AppsService.savePermission(data);
			// });
		};


		appsCtrl.editItem = function(perm){
			var ngdialog = ngDialog.open({
				template: 'modules/oms/manage/permissionEdit.html',
				data: {title:"编辑权限",perm:perm},
				controller:'PermissionEditCtrl'
			});

			ngdialog.closePromise.then(function(data){
				AppsService.savePermission(data);
			});
		};

		appsCtrl.deleteItem = function(id, e){
            StarsUtils.confirm('确定删除吗？','删除','不删除') .then(function(){
                $scope.processing_delete = true;

                var target = e.currentTarget || e.target;
                angular.element(target).css('display','none').next().css('display','inline-block');
                usSpinnerService.spin('spinner_'+id);

                AppsService.deletePermission(id).then(function(list){
                    console.log('delete in ctrl',list);
                    $scope.apps = list;
                },function(reason){
                    StarsUtils.alert('删除失败:'+reason);
                    $scope.processing_delete = true;

                    var target = e.currentTarget || e.target;
                    angular.element(target).css('display','inline-block').next().css('display','none');
                    usSpinnerService.stop('spinner_'+id);
                });
            })


		};

        appsCtrl.search = function(){
            $scope.search_error = true;
        };

	}]);

});