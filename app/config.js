'use strict';

require.config({
    // Cache busting
    // Enable for production only
    //urlArgs: '_=' + (new Date()).getTime(),

    baseUrl: './',

    paths: {
        app: 'app',
        angular: 'libs/angular/angular',
        angularAMD: "libs/angularAMD/angularAMD",
        ngload: "libs/angularAMD/ngload",
        ngDialog: "libs/ngDialog/js/ngDialog",
        text: "libs/text",
        ngAnimate: "libs/angular-animate/angular-animate",

        Session: "public/login/session",
        AuthService: "public/login/authService",
        login: "public/login/login",
        layout: "public/layout/layout",

        angularUiRouter: 'libs/angular-ui-router/angular-ui-router',
        uiRouterExtras: 'libs/ui-router-extras/ct-ui-router-extras',
        

        angularResource: 'libs/angular-resource/angular-resource',
        angularSanitize: 'libs/angular-sanitize/angular-sanitize.min',
        
        d3: 'libs/d3/d3',
        async: 'libs/requirejs-plugins/src/async',        
        jquery: 'libs/jquery/jquery.min',
        lodash: 'libs/lodash/lodash.min',
        ocLazyLoad: 'libs/ocLazyLoad/ocLazyLoad.min',
        
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
        angularAMD: { deps:['angular']},
        ngload: { deps: ['angularAMD']},
        ngDialog: {deps: ['angular', 'angularAMD'], exports: 'ngDialog'},
        ngAnimate: { deps: ['angular'] },

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