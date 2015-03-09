define([
    'angularAMD',
    'Session',
    'ngload!uiRouterExtras',
    'ngload!utils',
    'ngload!dirPagination'
], function(angularAMD, Session) {
    'use strict';

    var oms = angular.module('oms', ['star.session', 'ui.router', 'ngDialog', 'ct-ui-router-extras', 'stars.utils', 'dirPagination']);

    return oms;

});