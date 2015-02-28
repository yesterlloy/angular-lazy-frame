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

                "site.oms": {
                    name: 'site.oms',
                    url: '/oms',
                    views: {
                        "topnav": {
                            templateUrl: "public/layout/topnav.html",
                            controller: "TopnavCtrl"
                        },
                        "leftnav": {
                            templateUrl: "public/layout/leftnav.html",
                            controller: "LeftnavCtrl"
                        }

                    },
                    data: {
                        authorizedRoles: [session.userRole]
                    }

                },
                "site.oms.home": {
                    name: 'site.oms.home',
                    url:'/home',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/home/home.html",
                            controller: "HomeCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q){
                            return loadCtrl($q, ['modules/oms/home/home.js']);
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
                        "leftnav@": {},
                        "topnav@": {},
                        "content@site": {
                            templateUrl: "modules/oms/manage/permission.html",
                            controller: "PermissionCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q){
                            return loadCtrl($q, ['modules/oms/manage/permission.js', 'modules/oms/manage/permissionEdit.js']);
                        }
                    }
                },
                "site.oms.manage.role": {
                    name: "site.oms.manage.role",
                    url: "/role",
                    views: {
                        "leftnav@": {},
                        "topnav@": {},
                        "content@site": {
                            templateUrl: "modules/oms/manage/role.html",
                            controller: "RoleCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q){
                            return loadCtrl($q, ['modules/oms/manage/role.js']);
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