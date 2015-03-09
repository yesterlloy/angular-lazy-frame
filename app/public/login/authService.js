define(['angularAMD', 'Session'], function(angularAMD, Session){


angularAMD.factory('AuthService',['$http', 'Session', '$q', function($http, Session, $q) {

    var authService = {};

    authService.login = function (user) {
        

//        return $http({
//            url: 'http://api.oms.com/admin/login/login',
//            method: "POST",
//            headers: {
//                 'Authorization': 'Basic fdfwoeigjiewoe',
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//            data:user,
//            withCredentials: true
//        });

        var d = $q.defer();

        setTimeout(function(){
            $http.get( 'api/user.json?_=' + (new Date()).getTime() )
                .success(function(user){
                    Session.create(user);
                    d.resolve(user);
                })
                .error(function(info){
                    d.reject({"data": {"code":404,"message":"error message"}});
                });

        },2000);

        return d.promise;
    };

    authService.logout = function(){
        var d = $q.defer();
        setTimeout(function(){
            Session.destroy();
            d.resolve();
        },1000);
        return d.promise;
    }

    authService.isAuthenticated = function () {
        
        return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        // console.info('authorizedRoles', authorizedRoles.indexOf('*')>-1 );
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        
        return  authorizedRoles.indexOf('*')>-1 || 
            (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;

}]);

});