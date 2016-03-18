/**
 * Created by RizqyFahmi on 16/03/2016.
 */
var app = angular.module('booktrade', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            //template:'welcome user'
        }).when('/anotherPage', {
        template:'welcome user again'
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.controller('userController', function($scope, $http) {
    console.log('Hello world from controller');
    var reset = function(){
        $scope.user = null
    }

    $scope.register = function(){
        $http.post('/user/register', $scope.user).success(function(response){
            reset();
        });
    }

    $scope.login = function(){
        $http.post('/user/login', $scope.user).success(function(resUser){
            if(resUser==null){
                alert("Error! Username and password doesn't match!");
            }else{
                $http.post('/setSession', JSON.stringify(resUser)).success(function(response2){
                    //console.log(response2);
                    reset();
                    window.location = "/dashboard";
                });
            }
        });
    }
});

app.controller('bookController', function($scope, $http) {
    console.log('Hello world from book controller');
    var reset = function(){
        $scope.book = null
    }

    var refresh = function(){
        $http.get('/book/read').success(function(response){
            //console.log('I got the data I requested');
            //console.log(response);
            $scope.books = response;
        });
    }

    var refreshMyBook = function(){
        $http.get('/book/readMyBooks').success(function(response){
            $scope.myBooks = response;
        });
    }
    refresh();
    refreshMyBook();
    $scope.addBook = function(){
        $http.post('/book/add', $scope.book).success(function(response){
            console.log(response);
            reset();
            refresh();
            refreshMyBook();
        });
    }

    $scope.delete = function(id){
        $http.delete('/book/delete/'+id).success(function(response){
            refresh();
            refreshMyBook();
        });
    }

});

app.controller('settingController', function($scope, $http) {
    console.log('Hello world from setting controller');

    var getSetting = function(){
        $http.get('/setting/read').success(function(response){
            $scope.user = response;
        });
    }

    $scope.setting_update = function(){
        $http.put('/setting/update/'+$scope.user._id, $scope.user).success(function(res){
            getSetting();
        }).error(function(err){
            alert('err');
        });
    }

    getSetting();
});