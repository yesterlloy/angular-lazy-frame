define(['angularAMD'], function(angularAMD){
	'use strict';

	angularAMD.controller('TopnavCtrl',function($scope, $state){
		$scope.$state = $state;

		$scope.navList = $scope.currentUser.systems;

		console.log('TopnavCtrl',$scope.navList);
		
	});


	angularAMD.controller('LeftnavCtrl',function($scope, $state){
		$scope.$state = $state;


		var systems = $scope.currentUser.systems;

		$scope.navList = [];

		angular.forEach(systems, function(sys){
			if (('site.'+sys.name) == $state.current.name) {
				$scope.navList = sys.modules;
			};
		});

		console.log('LeftnavCtrl navList',$scope.navList);


	});

});