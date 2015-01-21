/**
 * Created by Administrator on 2015/1/21.
 */
define([

    'app',
    'principal',
    'authorization'

], function(app){

    app.config(appConfig)
        .run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',appRun ]);


    function appConfig($urlRouterProvider, $stateProvider, $ocLazyLoadProvider ) {
        $ocLazyLoadProvider.config({
            jsLoader: requirejs,
            debug: true
        });
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('site', {
                abstract: true,
                template: '<ui-view/>',
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
                templateUrl:'scripts/modules/home/home.html',
                controller:function(HomeCtrl){
                    console.info('homectrl',HomeCtrl);
                },
                resolve:{
                    HomeCtrl:'scripts/modules/home/home.js'
                    /*
                    ,
                    HomeCtrl:['$ocLazyLoad', function($ocLazyLoad){
                        console.info('state home resolve', $ocLazyLoad);

//                        var ocl = $ocLazyLoad.load({
//                            name:'app',
//                            files: [ 'scripts/modules/home/home.js']
//                        });
                        require('scripts/modules/home/home.js',function(rs){

                            console.info('state home resolve over', rs);
                            return rs;
                        });
                    }]
                     */

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
    }
    function appRun ($rootScope, $state, $stateParams, authorization, principal) {

        console.log('run');
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            console.info('state change ',toState);
            console.info('state change principal', principal);
            console.info('state change authorization', authorization);
            console.log(principal.isIdentityResolved());
            // track the state the user wants to go to; authorization service needs this
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            // if the principal is resolved, do an authorization check immediately. otherwise,
            // it'll be done when the state it resolved.
            if (principal.isIdentityResolved())
                authorization.authorize();
            else{
//                        principal.
            }
        });

    }



});
