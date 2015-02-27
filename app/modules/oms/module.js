define([
    'angularAMD',
    'Session',
    'ngload!uiRouterExtras'
], function(angularAMD, Session) {
    'use strict';

    var oms = angular.module('oms', ['star.session', 'ui.router', 'ngDialog', 'ct-ui-router-extras']);

    return oms;

});