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

				console.log($scope.filters.city);

				if($scope.filters.city && ($scope.filters.city != $scope.users[user].city) ){
					$scope.filteredUsers[user] = null;
					delete $scope.filteredUsers[user];
				} else if ($scope.filters.state && ($scope.filters.state != $scope.users[user].state) ){
					$scope.filteredUsers[user] = null;
					delete $scope.filteredUsers[user];
				}
				else if($scope.filters.instrument && ($scope.filters.instrument != 
					($scope.users[user].guitar || $scope.users[user].bass || $scope.users[user].drums || $scope.users[user].vocals))){
					$scope.filteredUsers[user] = null;
					delete $scope.filteredUsers[user];
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