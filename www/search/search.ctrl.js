angular.module('bander')

.controller('SearchCtrl', function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth) {
	$scope.filters = {};

	$scope.users = fbutil.syncObject('users/');

	$scope.filteredUsers = $scope.users;

	$scope.filter = function(){
	  if($scope.filters.city || $scope.filters.state || $scope.filters.instrument || $scope.filters.genre){
		$scope.filteredUsers = $scope.users;
		console.log($scope.filters);
		for (user in $scope.users) {
			if ($scope.users.hasOwnProperty(user) && (user.charAt(0) != "$") ) {
				if($scope.filters.city && ($scope.filters.city != $scope.users[user].city) ){
					$scope.filteredUsers[user] = null;
					delete $scope.filteredUsers[user];
				} 
				else if ($scope.filters.state && ($scope.filters.state != $scope.users[user].state) ){
					$scope.filteredUsers[user] = null;
					delete $scope.filteredUsers[user];
				}
				else if($scope.filters.instrument){
					var instr = $scope.filters.instrument;
					if ((instr!=$scope.users[user].guitar) &&  (instr!=$scope.users[user].bass) 
						&& (instr!=$scope.users[user].drums) && (instr!=$scope.users[user].vocals)){
						$scope.filteredUsers[user] = null;
						delete $scope.filteredUsers[user];
					}
				}
				else if($scope.filters.genre && ($scope.filters.genre != $scope.users[user].genre) ){
					$scope.filteredUsers[user] = null;
					delete $scope.filteredUsers[user];
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

		$scope.filteredUsers = $scope.users;
	};
});