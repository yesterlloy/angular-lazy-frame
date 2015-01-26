require([

    'angular',
    'app',
    './appconfig'

], function (angular, app, principal, authorization) {

        'use strict';

//        $(document).ready(function () {

            var ab = angular.bootstrap(document, ['app']);
console.info('after bootstrap', ab);
            // The following is required if you want AngularJS Scenario tests to work
            //$('html').addClass('ng-app: app');
//        });
    }
);