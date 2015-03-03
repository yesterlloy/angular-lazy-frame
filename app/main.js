define([

    'angularAMD',
    'app',
    'AuthService',
    'login',
    'applicationCtrl',
    'layout'

], function (angularAMD, app) {
     'use strict';

    console.log('main app',app);

	angularAMD.bootstrap(app);
});