define([

    'angular',
    'angularSanitize',
    'angularResource'

], function (angular) {

    'use strict';

    return angular.module('app.core', ['ngSanitize', 'ngResource']);
});