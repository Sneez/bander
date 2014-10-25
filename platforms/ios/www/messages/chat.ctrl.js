angular.module('bander')


.controller('ChatCtrl', function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth, $ionicNavBarDelegate) {

$scope.data = {};


$scope.messages = fbutil.syncObject('chat/'+$stateParams.chatId+'/message');


$scope.goBack = function(){
  $ionicNavBarDelegate.back();
};


$scope.addMessage = function(text){
  simpleLogin.getUser().then(function(auth){

    var path = 'users/' + auth.uid;
    $scope.userTemp = fbutil.syncObject(path);
    $scope.userTemp.$loaded().then(function(){


  	  var chatRef = fbutil.ref('chat/' + $stateParams.chatId + '/message').push({
  	    userName: $scope.userTemp.name,
  	    message: text
  	  });
  	});
  });
  $scope.data.message=null;
};

});
