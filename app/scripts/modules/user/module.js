define([
  'angular'
], function () {
  'use strict';

  return angular.module('app', []) .config(function ($stateProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'js/modules/user/login.html',
        controller:'UserController'
      });
  });



});
