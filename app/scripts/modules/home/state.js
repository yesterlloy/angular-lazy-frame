define([

    'angularUiRouter',    
    './home',

], function() {

    'use strict';

    angular.module('app.states.home', [
        'ui.router',        
    ]).config([
            '$stateProvider',
            '$urlRouterProvider',
            '$urlMatcherFactoryProvider',
            function($stateProvider,
                     $urlRouterProvider,
                     $urlMatcherFactoryProvider
                ) {

        $stateProvider
            .state('app', {
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                    authorize: ['authorization', function(authorization) {
                            return authorization.authorize();
                        }
                    ]
                }
            })
            .state('app.home', {
                url: '/',
                templateUrl: './scripts/modules/core/home.html',
                controller: 'HomeCtrl'                
            });         
        }
    ]);
});