var myApp = angular.module('myApp', []);
myApp.controller('contactList',['$scope','$http',function($scope,$http) {

    var refresh=function() {
        $http.get('/contactlist').success(function(res) {
            console.log("I got the data");
            $scope.contacts = res;
        });
    };
    refresh();
    $scope.addContact=function() {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact);
        $scope.contact = "";
        refresh();
    };

    $scope.remove=function(id) {
        console.log(id);
        $http.delete('/contactlist/'+ id);
        refresh();
    };
    $scope.edit=function(id) {
        $http.get('/contactlist/' + id).success(function(res) {
            $scope.contact = res;
            console.log(res.name);
        })
    };
    $scope.update=function() {
        $http.put('/contactlist/' + $scope.contact._id,$scope.contact).success(function(res) {
            console.log(res);
            $scope.contact = "";
            refresh();
        });
        console.log($scope.contact._id);
    };
}])