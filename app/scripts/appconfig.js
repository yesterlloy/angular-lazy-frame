/**
 * Created by Administrator on 2015/1/21.
 */
define([

    'app',
    'routingConfig',
    'authService'

], function(app, routingConfig, Auth){

    app.config(appConfig)
        .run(['$rootScope', '$state', '$stateParams', 'routingConfig', 'Auth',appRun ]);


    function appConfig($urlRouterProvider, $stateProvider, $ocLazyLoadProvider ) {
        $ocLazyLoadProvider.config({
            jsLoader: requirejs,
            debug: true
        });
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('site', {
                abstract: true,
                resolve: {
                    authorize: ['authorization', function(authorization) {
                        console.info('appconfig state site', authorization);
                            return authorization.authorize();
                        }
                    ]
                }
            })
            .state('home',{
                url:'/home',
                parent: 'site',
                data: {
                    roles: ['admin']
                },
                views: {
                    topNav: {  },
                    footer: {  }
                },
                templateUrl:'scripts/modules/home/home.html',
                controller:'HomeCtrl',
                resolve:{
                    HomeCtrl:['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name:'app',
                            files: [ 'scripts/modules/home/home.js']
                        });
                    }]

                }

            })
            .state('login',{
                parent: 'site',
                url: '/login',
                data: {
                    roles: []
                },
                templateUrl: 'scripts/modules/login/login.html',
                controller: 'LoginCtrl ',
                resolve: {
                    loginCtrl:['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name:'app',
                            files: [ 'scripts/modules/login/login.js']
                        });
                    }]
                }
            });
//        $urlRouterProvider.deferIntercept();
    }
    function appRun ($rootScope, $state, $stateParams, routingConfig, Auth) {

        console.log('run');

        //debug ui-router lifecycle
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
            console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);

            // track the state the user wants to go to; authorization service needs this
            $rootScope.toState = toState;
            $rootScope.toStateParams = toParams;
            // if the principal is resolved, do an authorization check immediately. otherwise,
            // it'll be done when the state it resolved.
            if (principal.isIdentityResolved())
                authorization.authorize();
        });
        $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
            console.info('$stateChangeError', arguments);
        });
        $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
            console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
        });
// $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//   // runs on individual scopes, so putting it in "run" doesn't work.
//   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
// });
        $rootScope.$on('$viewContentLoaded',function(event){
            console.log('$viewContentLoaded - fired after dom rendered',event);
        });
        $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
            console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
            console.log(unfoundState, fromState, fromParams);
        });

    }



});


