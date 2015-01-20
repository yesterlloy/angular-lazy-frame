define([

    'angularUiRouter',    
    './home',    

], function() {

    'use strict';

    angular.module('futureStates.states.core', [
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
                template: '<ui-view/>'
            })
            .state('app.home', {
                url: '/',
                templateUrl: './scripts/modules/core/home.html',
                controller: 'HomeCtrl'                
            });         
        }
    ]);
});