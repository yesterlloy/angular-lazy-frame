require([

    'angular',
    'app',
    'principal',
    'authorization'

], function (angular, app, principal, authorization) {

        'use strict';

        app.run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',
            function ($rootScope, $state, $stateParams, authorization, principal) {

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

            }]);

//        $(document).ready(function () {

            angular.bootstrap(document, ['app']);
console.info('after bootstrap', angular);
            // The following is required if you want AngularJS Scenario tests to work
            //$('html').addClass('ng-app: app');
//        });
    }
);