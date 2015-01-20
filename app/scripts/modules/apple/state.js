define([

    'angularUiRouter',
    './module', 
    './base',    

], function() {

    'use strict';

    angular.module('futureStates.states.apple', [
        'ui.router',
        'futureStates.apple'
    ]).config([
            '$stateProvider',
            '$urlRouterProvider',
            '$urlMatcherFactoryProvider',
            function($stateProvider,
                     $urlRouterProvider,
                     $urlMatcherFactoryProvider
                ) {

        $stateProvider            
            .state('app.apple', {
                url: '/apple',
                templateUrl: './scripts/modules/apple/base.html',
                controller: 'Apple.BaseCtrl'                
            });        
        }
    ]);
});