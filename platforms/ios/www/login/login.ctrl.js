angular.module('bander')

.controller('LoginCtrl', ['$scope', 'simpleLogin', '$location', function($scope, simpleLogin, $location) {

    $scope.email = null;
    $scope.pass = null;
    $scope.confirm = null;

    $scope.login = function(email, pass) {
      console.log(email, pass);
      $scope.err = null;
      simpleLogin.login(email, pass)
        .then(function(user) {
          console.log("fart");
          console.log(user);
          $location.path('/tab/profile');
        }, function(err) {
          console.log(err);
          $scope.err = errMessage(err);
        });
    };

    $scope.createAccount = function(name, email, password) {
      console.log(name, email, password);
      $scope.err = null;
      simpleLogin.createAccount(name, email, password)
        .then(function(user) {
          console.log(user);
          $location.path('/tab/profile');
        }, function(err) {
        console.log(err);
          $scope.err = errMessage(err);
        });
    };

    function errMessage(err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }
    
}]);

