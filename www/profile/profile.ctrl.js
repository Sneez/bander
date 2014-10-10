angular.module('bander')


.controller('ProfileCtrl', ['$scope', 'simpleLogin', '$location', '$timeout', '$firebase', 'fbutil', '$stateParams', 'waitForAuth', 
  function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth) {

 
        $scope.editing  = false;



        $scope.input = {};

        console.log('$stateParams');
        console.log($stateParams);

        waitForAuth.then(function(){
          var userId;
          if ($stateParams.profileId) {
            console.log('there were params');
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



        // waitForAuth.then(function(){
        //   var userId;
        //   if ($stateParams.profileId) {
        //     $scope.otherProfile = true;
        //     userId              = $stateParams.profileId;
        //   } else {
        //     userId            = $scope.auth.user.id || AuthStorage.get().id;
        //   }
        //   var userRef           = $Ref('users/'+userId);
        //   $scope.user           = userRef;
        //   $scope.showHeaderName = {val: false};
        //   $scope.input = {};
        //   // $scope.input          = $scope.user;
        //   console.log($scope.user);
        //   $ionicLoading.hide();
        // });





// simpleLogin.getUser().then(function(auth){
//   $timeout(function(){
//     $scope.auth = auth;
//     var path = 'users/' + auth.uid;
//     $scope.user = fbutil.syncObject(path);
//   },0);
// });
// console.log($scope.auth);


$scope.logout = function() {
  console.log("logging out");
  simpleLogin.logout();
  $location.path('/login');
};

}]);
