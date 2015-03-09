define([
    'app',
    'utils',
],function(app, utils){
    'use strict';


        function BaseCtrl(name, $scope, $http, $q, $parse, ngDialog){
            this.$scope = $scope;
            this.name = name;
            this.$http = $http;
            this.$q = $q;
            this.$parse = $parse;
            this.ngDialog = ngDialog;

            this.loading = false;
        }


        BaseCtrl.prototype.createItem = function(){

        }

        BaseCtrl.prototype.getList = function(){
            var d = this.$q.defer();

            $http({

            });

            return d.promise;
        }

        BaseCtrl.prototype.deleteItem = function(){

        }

        BaseCtrl.prototype.editItem = function(){

        }

        BaseCtrl.prototype.search = function(){

        }





    return BaseCtrl;
});