define([
  'angular',
  'ui.router',
  '../../config'
], function () {
  'use strict';


  return angular.module('app.user', [
    'app.constants',
    'ui.router'
  ]).config(function ($stateProvider) {
console.log('app.user');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'js/modules/user/login.html',
        controller:'UserController',
      });
  });



});
