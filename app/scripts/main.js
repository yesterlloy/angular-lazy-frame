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
                   console.info('state change',toState);
                    // track the state the user wants to go to; authorization service needs this
                    $rootScope.toState = toState;
                    $rootScope.toStateParams = toStateParams;
                    // if the principal is resolved, do an authorization check immediately. otherwise,
                    // it'll be done when the state it resolved.
                    if (principal.isIdentityResolved()) authorization.authorize();
                });

            }]);

        $(document).ready(function () {

            angular.bootstrap(document, ['futureStates']);

            // The following is required if you want AngularJS Scenario tests to work
            $('html').addClass('ng-app: futureStates');
        });
    }
);