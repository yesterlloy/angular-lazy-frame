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

            function setStates(objs){
                angular.forEach(objs, function(obj){
                    if(undefined !== stateFactory['site.' + obj.name]){
                        $stateProvider.state(stateFactory['site.' + obj.name]);
                        if(undefined !== obj.modules && obj.modules.length > 0){
                            setStates(obj.modules);
                        }
                        if(undefined !== obj.controllers && obj.controllers.length > 0){
                            setStates(obj.controllers);
                        }
                    }
                });
            }
            setStates(session.systems);

        }]);

});