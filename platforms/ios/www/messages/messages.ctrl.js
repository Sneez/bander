angular.module('bander')

.controller('MessagesCtrl', function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth, messageList) {
 		simpleLogin.getUser().then(function(auth){
    		$scope.myMessages = messageList(auth);
    	});

});
