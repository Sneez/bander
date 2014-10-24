angular.module('bander')

.controller('SearchCtrl', function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth) {
	$scope.filters = {};

	$scope.users = fbutil.syncObject('users/');

	$scope.listUsers = $scope.users;


	var count = 1;
	var slString= 'simplelogin:'+count;

	var limQuery = fbutil.ref('users/').startAt(null, slString).limit(10);
	limQuery.once('value', function(snapshot){
		$scope.listUsers = snapshot.val();
		console.log($scope.listUsers);
	});

// console.log(fbutil.ref('users/'));
//  $scope.sync = $firebase(fbutil.ref('users/').startAt(null, 'simplelogin:1').limit(10)).$asArray();

//   $scope.sync.$loaded().then(function() {
//      console.log($scope.sync);
//   });

  // we can add it directly to $scope if we want to access this from the DOM



	$scope.filter = function(){
	  if($scope.filters.city || $scope.filters.state || $scope.filters.instrument || $scope.filters.genre){
		$scope.listUsers = $scope.users;
		console.log($scope.filters);
		for (user in $scope.users) {
			var alreadyGone = false;
			if ($scope.users.hasOwnProperty(user) && (user.charAt(0) != "$") ) {
				if($scope.filters.city && ($scope.filters.city != $scope.users[user].city) ){
					$scope.listUsers[user] = null;
					delete $scope.listUsers[user];
					alreadyGone=true;
				} 
				if(alreadyGone==false){
					if ($scope.filters.state && ($scope.filters.state != $scope.users[user].state)){
						$scope.listUsers[user] = null;
						delete $scope.listUsers[user];
						alreadyGone=true;
					}
				}
				if(alreadyGone==false){
					if($scope.filters.instrument){
						var instr = $scope.filters.instrument;
						if ((instr!=$scope.users[user].guitar) &&  (instr!=$scope.users[user].bass) 
							&& (instr!=$scope.users[user].drums) && (instr!=$scope.users[user].vocals)){
							$scope.listUsers[user] = null;
							delete $scope.listUsers[user];
							alreadyGone=true;
						}
					}
				}
				if(alreadyGone==false){
					if($scope.filters.genre && ($scope.filters.genre != $scope.users[user].genre)){
						$scope.listUsers[user] = null;
						delete $scope.listUsers[user];
						alreadyGone=true;
					}
				}
			}
		}
	  }
	};

	$scope.clear = function(){
		$scope.filters.city=null;
		$scope.filters.state=null;
		$scope.filters.instrument=null;
		$scope.filters.genre=null;

	$scope.users = fbutil.syncObject('users/');

	$scope.listUsers = $scope.users;
	var count = 1;
	var slString= 'simplelogin:'+count;

	var limQuery = fbutil.ref('users/').startAt(null, slString).limit(10);
	limQuery.once('value', function(snapshot){
		$scope.listUsers = snapshot.val();
		console.log($scope.listUsers);
	});

	};
});