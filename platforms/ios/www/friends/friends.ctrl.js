angular.module('bander')

.controller('FriendsCtrl', function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth) {


  simpleLogin.getUser().then(function(auth){
    $scope.myFriends = fbutil.syncObject('friends/'+auth.uid);
    console.log($scope.myFriends);
  });



});

