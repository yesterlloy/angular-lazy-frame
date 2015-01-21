/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
    'angular',
    'angularUiRouter',
    'ocLazyLoad',
], function (angular ) {
    'use strict';

    return angular.module('app', [ 'ui.router', 'oc.lazyLoad' ]);

});
