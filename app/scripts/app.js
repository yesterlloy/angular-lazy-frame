/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
    'angular',
    'angularUiRouter',
    'ocLazyLoad'
], function (angular, depResolver) {
    'use strict';
    console.info('app.config 1', depResolver);

    var app = angular.module('app', [ 'ui.router', 'oc.lazyLoad' ]);

    app.config(function ($urlRouterProvider, $stateProvider ) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home',{
                url:'/home',
                templateUrl:'js/modules/home/home.html',
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
                templateUrl: 'js/modules/login/login.html',
                controller: 'LoginController ',
                resolve: {
                    LoginController : function($ocLazyLoad){
                        return $ocLazyLoad.load('modules/login/loginController') ;
                    }
                }
            });
//        $urlRouterProvider.deferIntercept();
    });

    return app;
});
