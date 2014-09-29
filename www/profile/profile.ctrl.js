angular.module('bander')


.controller('ProfileCtrl', ['$scope', 'simpleLogin', '$location', '$timeout', '$firebase', 'fbutil', function($scope, simpleLogin, $location, $timeout, $firebase, fbutil) {


  simpleLogin.getUser().then(function(auth){
    $timeout(function(){
      $scope.auth = auth;
      var path = 'users/' + auth.uid;
      $scope.user = fbutil.syncObject(path);
    },0);
  });
  console.log($scope.auth);
}]);