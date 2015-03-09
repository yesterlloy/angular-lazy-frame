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
			if ( $state.current.name.indexOf(sys.name) > -1 ) {
				$scope.navList = sys.modules;
			};
		});

		console.log('LeftnavCtrl navList',$scope.navList );

        $scope.menuClick = function(e){
            var target = angular.element(e.currentTarget);

            var next = target.next();
            console.info('target',target,'next',next,next.length>0);

            if( next.length > 0 ){
                e.preventDefault();
                if(next.hasClass('collapse')) {
                    target.find('span').attr('class','glyphicon glyphicon-triangle-bottom')
                    next.removeClass('collapse');
                }else {
                    target.find('span').attr('class','glyphicon glyphicon-triangle-right')
                    next.addClass('collapse');
                }

            }


        }


	});

});