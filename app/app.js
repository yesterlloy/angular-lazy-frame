/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
    'angular',
    'angularAMD',
    'AuthService',
    'angularUiRouter',
    'uiRouterExtras',
    'Session',
    'ngDialog',
    'spin',
    'angularSpinner',
    'ngAnimate',
    'angularStrap',
    'angularStrapTpl',
    'utils'
], function (angular, angularAMD, AuthService) {
    'use strict';

    var app = angular.module('app', [
        'stars.session',
        'stars.utils',
        'ui.router',
        'ct.ui.router.extras',
        'ngDialog',
        'angularSpinner',
        'mgcrea.ngStrap'
    ]);



app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    user: 'user',
    guest: 'guest'
});


app.config(appConfig)
    .run(appRun);



appConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'USER_ROLES', '$httpProvider', '$futureStateProvider', '$controllerProvider'];

function appConfig($urlRouterProvider, $stateProvider, USER_ROLES, $httpProvider, $futureStateProvider, $controllerProvider){


    $futureStateProvider.stateFactory('ngload', ngloadStateFactory); // register AngularAMD ngload state factory
      


    $urlRouterProvider.otherwise('/login');
    // Public routes
    $stateProvider
        .state('public', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: 'public/404.html'
        })
        .state('public.accessdenied', {
            url: '/accessdenied',
            templateUrl: "public/accessdenied.html"
        })
        .state('public.login', {
            url: '/login',
            templateUrl: 'public/login/login.html',
            controller: 'LoginCtrl'
        })
        .state('public.logout', {
            url: '/logout',
            templateUrl: 'public/login/login.html',
            controller: 'LoginCtrl'
        })
        .state('public.register', {
            url: '/register',
            templateUrl: 'register',
            controller: 'RegisterCtrl'
        });

    $stateProvider.state('site', {
        abstract: true,
        views: {
            "": {
                templateUrl: "public/layout/layout.html",
            }
            
        },
        data: {
            authorizedRoles: []
        }

    });


//        $urlRouterProvider.deferIntercept();
}

appRun.$inject = ['$rootScope', '$state', '$stateParams', 'AUTH_EVENTS', 'USER_ROLES', 'AuthService', 'Session', '$q'];

function appRun($rootScope, $state, $stateParams, AUTH_EVENTS, USER_ROLES, AuthService, Session, $q){
	console.log('run');

     $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(){
        $state.go('public.login');
    });

    $rootScope.$on(AUTH_EVENTS.notAuthorized, function(){
        $state.go('public.accessdenied');
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
        console.log('login success stateProvider',$state);
        var loadStates = function($q, Session){

            var promises = [];

            angular.forEach(Session.systems, function(sys, idx){
                if(idx == 0){
                    Session.defaultState = 'site.' + sys.name + '.home';
                }
                var d = $q.defer();
                require(["ngload!modules/" + sys.name + "/states.js", 'ngload', 'angularAMD'],
                    function ngloadCallback(result, ngload, angularAMD){

                        angularAMD.processQueue();
                        d.resolve(undefined);

                        return d.promise;
                    });

                promises.push(d.promise);

            });

            return $q.all(promises);
        }
        
        var result = loadStates($q, Session);

        result.then(function(){
            console.log('login success; site.oms=', $state.get('site.oms'));
            $state.go( Session.defaultState );
        },function(){
            console.log('login error states===',$state.get() );
            $state.go('public.login');
        });
        
        
        
    });

    //debug ui-router lifecycle
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, fromState);
        
        var authorizedRoles = toState.data ? toState.data.authorizedRoles : [];
        // console.info('run event authorizedRoles', authorizedRoles);
        if (!AuthService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            // console.info('isAuthenticated',AuthService.isAuthenticated());
            if (AuthService.isAuthenticated()) {
                // user is not allowed
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                // user is not logged in
                // $state.go('public.login');
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
        }

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

function ngloadStateFactory($q, futureState) {
    var ngloadDeferred = $q.defer();
    require([ "ngload!" + futureState.src , 'ngload', 'angularAMD'],
        function ngloadCallback(result, ngload, angularAMD) {
          angularAMD.processQueue();
          ngloadDeferred.resolve(undefined);
        });
    return ngloadDeferred.promise;
  } 

  

    return app;

});
