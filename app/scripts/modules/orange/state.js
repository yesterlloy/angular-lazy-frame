define([

    'angularUiRouter',
    './module',
    './base',    

], function() {

    'use strict';

    angular.module('app.states.orange', [
        'ui.router',        
        'app.orange'
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