define([

    'angular',
    'angularSanitize',
    'angularResource'

], function (angular) {

    'use strict';

    return angular.module('app.orange', ['ngSanitize', 'ngResource']);
});