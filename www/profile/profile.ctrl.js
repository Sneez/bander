angular.module('bander')


.controller('ProfileCtrl', ['$scope', 'simpleLogin', '$location', '$timeout', '$firebase', 'fbutil', '$stateParams', 'waitForAuth', 
  function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth) {

 
        $scope.editing  = false;
        $scope.otherProfile = false;



        $scope.input = {};

        console.log('$stateParams');
        console.log($stateParams);

        waitForAuth.then(function(){
          var userId;
          if ($stateParams.profileId) {
            console.log('there were params');
            // profile does not belong to current user
            $scope.otherProfile = true;
            userId              = $stateParams.profileId;
            var path            = 'users/' + userId;
            $scope.user         = fbutil.syncObject(path);
          } else {
            console.log('there were no params');
            simpleLogin.getUser().then(function(auth){
              $timeout(function(){
                $scope.auth = auth;
                var path = 'users/' + auth.uid;
                $scope.user = fbutil.syncObject(path);
              },0);
            });
          }
          console.log($scope.user);
        });



$scope.data = {
 instrument: null 
}

$scope.submitInfo = function() {
  console.log($scope.data.instrument);

  // $scope.user.$inst().$ref().child('/users/' + $scope.user.uid + '/instrument').set($scope.data.instrument);

  console.log($scope.user);
  $scope.user.$inst().$set("instrument", $scope.data.instrument);
};

$scope.editMode = function() {
  $scope.editing = !$scope.editing;
};

$scope.logout = function() {
  console.log("logging out");
  simpleLogin.logout();
  $location.path('/login');
};

}]);
