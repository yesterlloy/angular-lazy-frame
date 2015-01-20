define([

    'angularUiRouter',
    './module',
    './base',    

], function() {

    'use strict';

    angular.module('futureStates.states.orange', [
        'ui.router',        
        'futureStates.orange'
    ]).config([
            '$stateProvider',
            '$urlRouterProvider',
            '$urlMatcherFactoryProvider',
            function($stateProvider,
                     $urlRouterProvider,
                     $urlMatcherFactoryProvider
                ) {

        $stateProvider            
            .state('app.orange', {
                url: '/orange',
                templateUrl: './scripts/modules/orange/base.html',
                controller: 'Orange.BaseCtrl'                
            });            
        }
    ]);
});