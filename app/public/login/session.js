define(['angularAMD'], function(){

    var module = angular.module('star.session',[]);

    module.provider('$starSession', function(){
        var starSession = {};

        this.setSession = function(value){
            starSession = value;
        };

        this.getSession = function(){
            return starSession;
        };     

        this.$get = ['$http', function($http){

            function CreateSession(settings){
                var self = this,
                    session = this.session = angular.extend({}, starSession, settings);

                    starSession = session;
            }

            CreateSession.prototype.getSession = function(){
                return this.session;
            };

            return {
                create: function(settings){
                    return new CreateSession(settings);
                }
            };
        }];
    });

    module.service('Session',['$starSession', function($starSession) {

        var session = this;
        session.create = function (user) {
            console.log('session user===', user, $starSession);
            $starSession.create(user);
     
            session.id = user.sessionId;
            session.userId = user.userId;
            session.userRole = user.userRole;
            session.userName = user.userName;
            session.systems = user.systems;


        };
        session.destroy = function () {
            session.id = null;
            session.userId = null;
            session.userRole = null;
            session.userName = null;
            session.itemList = null;
            session.systems = null;
            session.modules = null;
            session.controllers = null;
        };

        return session;
    }]);

    return module;
});



