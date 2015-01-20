define([
    'angular',
    'angularUiRouter',
    'uiRouterExtras',
    'uiRouterExtrasStatevis',
    'ocLazyLoad',
    'modules/core/module',
    'modules/core/settings',
    'modules/core/state'
], function (angular) {

    'use strict';

    return angular.module('futureStates',
        [
            'ui.router',
            'ct.ui.router.extras',
            'ct.ui.router.extras.examples.statevis',
            'oc.lazyLoad',
            'futureStates.core',
            'futureStates.states.core'
        ]).config([
            '$ocLazyLoadProvider',
            '$futureStateProvider',
            'SettingsServiceProvider',
            function($ocLazyLoadProvider,
                     $futureStateProvider,
                     SettingsServiceProvider) {

                $ocLazyLoadProvider.config ({
                    debug: true,
                    jsLoader: requirejs,
                    loadedModules: ['futureStates'],
                    modules: [{
                        reconfig: true,
                        name: 'futureStates.states.orange',
                        files: ['modules/orange/state']
                    }, {
                        reconfig: true,
                        name: 'futureStates.states.apple',
                        files: ['modules/apple/state']
                    }]
                });

                var ocLazyLoadStateFactory = function ($q, $ocLazyLoad, futureState) {
                    var deferred = $q.defer();
                    $ocLazyLoad.load(futureState.module).then(function(name) {
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    });
                    return deferred.promise;
                };

                $futureStateProvider.stateFactory('ocLazyLoad', ocLazyLoadStateFactory);

                $futureStateProvider.addResolve(function ($injector) {
                    /**
                     * NOTE: resolves can be used for determining
                     * which future states you actually want.
                     * Here, we register both apples and oranges.
                     * Try uncommenting the if/else to see
                     * the magic of provider injected logic
                     *
                     * Important thing to remember: in addResolve, you have
                     * to "return" the thenable promise chain if you want it
                     * to actually wait on your provider's resolution.
                     */
                    return $injector.invoke(SettingsServiceProvider.fruit).then(
                        function (fruitResult) {
//                            if (fruitResult === 'oranges') {
                            $futureStateProvider.futureState({
                                'stateName': 'app.orange',
                                'urlPrefix': '/orange',
                                'type': 'ocLazyLoad',
                                'module': 'futureStates.states.orange'
                            });
//                            } else if (fruitResult === 'apples') {
                            $futureStateProvider.futureState({
                                'stateName': 'app.apple',
                                'urlPrefix': '/apple',
                                'type': 'ocLazyLoad',
                                'module': 'futureStates.states.apple'
                            });
//                            }
                        }
                    );
                });
            }]);
});