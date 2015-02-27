define([
    'angularAMD',
    'Session',
    './module'
], function(angularAMD, Session, module){

    'use strict';

    module.config(['$stateProvider', '$starSessionProvider', '$futureStateProvider',
        function($stateProvider, $starSessionProvider, $futureStateProvider, $scope){

            var session = $starSessionProvider.getSession();
            var defaultState = '';

            function loadCtrl($q, deps){
                var d = $q.defer();
                require(deps, function(){
                    d.resolve();
                });
                return d.promise;
            }

            var stateFactory = {

                "site.adv": {
                    name: 'site.adv',
                    url: '/adv',
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

                },
                "site.adv.home": {
                    name: 'site.adv.home',
                    url:'/home',
                    views: {
                        "content@site": {
                            templateUrl: "modules/adv/home/home.html",
                            controller: "AdvHomeCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q){
                            return loadCtrl($q, ['modules/adv/home/home.js']);
                        }
                    }
                }

            };

            angular.forEach(session.systems, function(sys){

                if(undefined != stateFactory['site.' + sys.name]){

//                    console.log('sys in adv', stateFactory['site.' + sys.name]);

                    $stateProvider.state(stateFactory['site.' + sys.name]);

                    if( sys.modules.length > 0 ){
                        angular.forEach(sys.modules, function(module, i){
                            if( i == 0 ){
                                defaultState = 'site.' + module.name;
                            }

//                            console.log('module', stateFactory['site.' + module.name]);
                            $stateProvider.state(stateFactory['site.' + module.name]);

                            if( module.controllers.length > 0 ){
                                angular.forEach(module.controllers, function(ctrl){
//                                    console.log('module ctrl', stateFactory['site.' + ctrl.name]);

                                    $stateProvider.state(stateFactory['site.' + ctrl.name]);
                                });
                            }
                        });
                    }

                }
            });

        }]);

});