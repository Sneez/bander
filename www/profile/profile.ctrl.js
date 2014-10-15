angular.module('bander')


.controller('ProfileCtrl', ['$scope', 'simpleLogin', '$location', '$timeout', '$firebase', 'fbutil', '$stateParams', 'waitForAuth', 
  function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth) {

 
        $scope.editing  = false;
        $scope.otherProfile = false;



        $scope.input = {};

        console.log('$stateParams');
        console.log($stateParams);

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
            console.log("outside timeout");
            $timeout(function(){
              console.log("inside timeout");
              $scope.auth = auth;
              var path = 'users/' + auth.uid;
              $scope.user = fbutil.syncObject(path);
            },0);
          });
        }
        console.log($scope.user);



$scope.data = {
 city: '',
 state: '',
 guitar: '',
 bass: '',
 drums: '',
 vocals: '',
 genre: '',
 influences: '',
 goals: ''
};

$scope.submitInfo = function() {
  console.log($scope.data.instrument);

  // $scope.user.$inst().$ref().child('/users/' + $scope.user.uid + '/instrument').set($scope.data.instrument);

  console.log($scope.user);
  $scope.user.$inst().$set("city", $scope.data.city);
  $scope.user.$inst().$set("state", $scope.data.state);
  $scope.user.$inst().$set("guitar", $scope.data.guitar);
  $scope.user.$inst().$set("bass", $scope.data.bass);
  $scope.user.$inst().$set("drums", $scope.data.drums);
  $scope.user.$inst().$set("vocals", $scope.data.vocals);
  $scope.user.$inst().$set("genre", $scope.data.genre);
  $scope.user.$inst().$set("influences", $scope.data.influences);
  $scope.user.$inst().$set("goals", $scope.data.goals);
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
