define([
    'angularAMD',
    'Session',
    'ngload!uiRouterExtras',
    'ngload!utils'
], function(angularAMD, Session) {
    'use strict';

    var oms = angular.module('oms', ['star.session', 'ui.router', 'ngDialog', 'ct-ui-router-extras', 'stars.utils']);

    return oms;

});