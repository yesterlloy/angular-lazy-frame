define([
    'angular',
    'angularUiRouter',
    'uiRouterExtras',
    'ocLazyLoad',
], function (angular) {

    'use strict';

    var app = angular.module('app', [
        'ui.router',
        'ct.ui.router.extras',
        'oc.lazyLoad',
    ]);
    app.config([
        '$ocLazyLoadProvider',
        '$futureStateProvider',
        function($ocLazyLoadProvider, $futureStateProvider, $stateProvider, $urlRouterProvider ) {

            $ocLazyLoadProvider.config ({
                debug: true,
                jsLoader: requirejs,
                loadedModules: ['app'],
                modules: [{
                    reconfig: true,
                    name: 'app.login',
                    files: ['modules/login/state']
                }, {
                    reconfig: true,
                    name: 'app.home',
                    files: ['modules/home/state']
                }]
            });

            var ocLazyLoadStateFactory = function ($q, $ocLazyLoad, futureState) {
                var deferred = $q.defer();
                $ocLazyLoad.load(futureState.module).then(function(name) {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });
                return deferred.promise;
            };

            $futureStateProvider.stateFactory('ocLazyLoad', ocLazyLoadStateFactory);

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home',{
                    url:'/home',
                    templateUrl:'modules/home/home.html',
                    controller:'HomeController',
                    resolve:{
                        homeController:function($ocLazyLoad){
                            console.log('state home resolve');
                            return $ocLazyLoad.load('modules/core/home');
                        }
                    }

                })
                .state('login',{
                    url: '/login',
                    templateUrl: 'modules/login/login.html',
                    controller: 'LoginController ',
                    resolve: {
                        LoginController : function($ocLazyLoad){
                            return $ocLazyLoad.load('modules/login/loginController') ;
                        }
                    }
                });

        }]);
    return app;
});