define([
    'angularAMD',
    'Session'
], function(angularAMD, Session) {
    'use strict';

    var module = angular.module('adv', ['star.session', 'ui.router', 'ngDialog']);

    return module;

});