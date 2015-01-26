'use strict';

require.config({
    // Cache busting
    // Enable for production only
    //urlArgs: '_=' + (new Date()).getTime(),

    baseUrl: 'scripts/',

    paths: {
        angular: 'libs/angular/angular',
        angularAMD: "libs/angularAMD/angularAMD",
        ngload: "libs/angularAMD/ngload",

        angularResource: 'libs/angular-resource/angular-resource',
        angularSanitize: 'libs/angular-sanitize/angular-sanitize.min',
        angularUiRouter: 'libs/angular-ui-router/angular-ui-router',
        d3: 'libs/d3/d3',
        async: 'libs/requirejs-plugins/src/async',        
        jquery: 'libs/jquery/jquery.min',
        lodash: 'libs/lodash/lodash.min',
        ocLazyLoad: 'libs/ocLazyLoad/ocLazyLoad.min',
        uiRouterExtras: 'libs/ui-router-extras/ct-ui-router-extras',
        uiRouterExtrasStatevis: 'libs/ui-router-extras-statevis/statevis',
        ngCookies: 'libs/angular-cookies/angular-cookies',

        //utils
        routingConfig: 'modules/login/routingConfig',
        authService:'modules/login/authService'
    },

    shim: {
        angular: {
//            deps: ['jquery'],
            exports: 'angular'
        },
        ngCookies: { deps:['angular']   },
        angularResource: { deps: ['angular'] },
        angularSanitize: { deps: ['angular'] },
        angularUiRouter: {deps: ['angular']},
        d3: {deps: []},
        jquery: { exports: '$' },
        lodash: { exports: '_' },
        ocLazyLoad: {deps: ['angular']},
        uiRouterExtras: {deps: ['angularUiRouter']},
        uiRouterExtrasStatevis: {deps: ['uiRouterExtras']}
    },

    deps: ['main']
});