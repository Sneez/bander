angular.module('bander')

.controller('MessagesCtrl', function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth) {


  simpleLogin.getUser().then(function(auth){
    $scope.myMessages = fbutil.syncObject('messages/'+auth.uid);
    console.log($scope.myMessages);
  });



});
