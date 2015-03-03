'use strict';

require.config({
    // Cache busting
    // Enable for production only
    //urlArgs: '_=' + (new Date()).getTime(),

    baseUrl: './',

    paths: {
        app: 'app',
        angular: 'libs/angular',
        angularAMD: "libs/angularAMD",
        ngload: "libs/ngload",
        ngDialog: "libs/ngDialog",
        text: "libs/text",
        ngAnimate: "libs/angular-animate",
        angularStrap: "libs/angular-strap",
        angularStrapTpl: "libs/angular-strap.tpl",

        Session: "public/login/session",
        AuthService: "public/login/authService",
        login: "public/login/login",
        layout: "public/layout/layout",

        angularUiRouter: 'libs/angular-ui-router',
        uiRouterExtras: 'libs/ct-ui-router-extras',

        spin: 'libs/spin',
        angularSpinner: 'libs/angular-spinner',

        angularResource: 'libs/angular-resource',
        angularSanitize: 'libs/angular-sanitize',
        
        d3: 'libs/d3',
        async: 'libs/requirejs-plugins/src/async',        
        jquery: 'libs/jquery.min',
        lodash: 'libs/lodash',

        ngCookies: 'libs/angular-cookie',

        //utils
        utils: 'utils/utils',
        routingConfig: 'public/login/routingConfig',
        authService:'public/login/authService'
    },

    shim: {
        angular: {
//            deps: ['jquery'],
            exports: 'angular'
        },
        angularAMD: { deps:['angular']},
        angularStrap: { deps:['angular']},
        angularStrapTpl: { deps:['angular']},
        ngload: { deps: ['angularAMD']},
        ngDialog: {deps: ['angular', 'angularAMD'], exports: 'ngDialog'},
        ngAnimate: { deps: ['angular'] },

        angularSpinner: { deps: ['angular', 'spin'] },

        utils: { deps: ['angular', 'angularAMD', 'ngDialog'] },

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