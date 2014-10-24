angular.module('bander')


.controller('ProfileCtrl', function ($scope, simpleLogin, $location, $timeout, $firebase, fbutil, $stateParams, waitForAuth, $ionicNavBarDelegate, $ionicModal, $ionicBackdrop, ytConvert, mapStyle) {

 
        $scope.editing  = false;
        $scope.otherProfile = false;
        $scope.user = {};
        $scope.isVideo = false;


        

        console.log('mapView true');
        $scope.mapView = true;
        $scope.listView = false;
        var mapOptions = {
          center: new google.maps.LatLng(36.977598,-122.030495),
          zoom: 13,
          styles: mapStyle.get()
        };
        console.log(mapStyle.get());

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      console.log('maaaaappp');



        $scope.goBack = function(){
          $ionicNavBarDelegate.back();
        };

        $scope.input = {};

        console.log($scope.user);
        console.log($stateParams.profileId);

        var userId;
        if ($stateParams.profileId) {
          console.log('there were params');
          // profile does not belong to current user
          $scope.otherProfile = true;
          userId              = $stateParams.profileId;
          var path            = 'users/' + userId;
          $scope.user         = fbutil.syncObject(path);
            $scope.user.$loaded().then(function(){

              if(typeof $scope.user.stream_url != 'undefined'){
                $scope.isVideo = true;

              }

              if(typeof $scope.user.city != 'undefined' || typeof $scope.user.state != 'undefined'){
                console.log('dis shit right here');
                var place = $scope.user.city + ", " + $scope.user.state;
  
                geocoder.geocode( {'address' : place}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      map.setCenter(results[0].geometry.location);
                  }
                });
              }
            });

        } else {
          console.log('there were no params');
          simpleLogin.getUser().then(function(auth){
            console.log("outside timeout");
            $timeout(function(){
              console.log("inside timeout");
              $scope.auth = auth;
              var path = 'users/' + auth.uid;
              $scope.user = fbutil.syncObject(path);
              $scope.user.$loaded().then(function(){

              if(typeof $scope.user.stream_url != 'undefined'){
                $scope.isVideo = true;

              }
  
                if(typeof $scope.user.city != 'undefined' || typeof $scope.user.state != 'undefined'){
                  console.log('dis shit right here');
                  var place = $scope.user.city + ", " + $scope.user.state;
    
                  geocoder.geocode( {'address' : place}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                    }
                  });
                }
              });

            },0);
          });
        }



  $ionicModal.fromTemplateUrl('profile/editModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.editing = true;
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.submitInfo();
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    $ionicBackdrop.release();
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    $ionicBackdrop.release();
  });








$scope.data = {};

$scope.submitInfo = function() {
  console.log($scope.data);
  $scope.user.$inst().$update($scope.data);

};

$scope.editMode = function() {
  $scope.editing = !$scope.editing;
};

$scope.logout = function() {
  console.log("logging out");
  simpleLogin.logout();
  $location.path('/login');
};

$scope.friendRequest = function() {
  var requestSender;
  var requested = $stateParams.profileId;
  simpleLogin.getUser().then(function(auth){
    var path = 'users/' + auth.uid;
    $scope.userTemp = fbutil.syncObject(path);
    $scope.userTemp.$loaded().then(function(){

      console.log($scope.userTemp.name);

      var inputObject = {
          time: Firebase.ServerValue.TIMESTAMP,
          userName: $scope.userTemp.name
      };

      fbutil.ref('invites/').child(requested).child(auth.uid).set(inputObject);
    });
  });
};

$scope.acceptInvite = function(key, name){
  simpleLogin.getUser().then(function(auth){


    fbutil.ref('friends/'+auth.uid+'/'+key).set({
      userName: name
    });

    var path = 'users/' + auth.uid;
    $scope.userTemp = fbutil.syncObject(path);
    $scope.userTemp.$loaded().then(function(){

    console.log($scope.userTemp.name);
      fbutil.ref('friends/'+key+'/'+auth.uid).set({
        userName: $scope.userTemp.name
      });
    });
  });
  $scope.declineInvite(key);
};


$scope.declineInvite = function(key){

  simpleLogin.getUser().then(function(auth){
    console.log(auth.uid);
    fbutil.ref('invites/'+auth.uid+'/'+key).set(null, function(err){
      if(!err){
        console.log('remove successful');
      } else if (err){
        console.log('there was an error removing ' + err);
      }
    });
  });
};

$scope.sendMessage = function(){

  var alreadyExists = false;

  simpleLogin.getUser().then(function(auth){
    $scope.ifAlready = fbutil.syncObject('messages/'+$stateParams.profileId+'/'+auth.uid);
    console.log($scope.ifAlready);
    console.log("stateparams: " + $stateParams.profileId);
    console.log("auth.uid: " + auth.uid);



    $scope.ifAlready.$loaded().then(function(){
      console.log($scope.ifAlready.chatId);
      if(typeof $scope.ifAlready.chatId != "undefined"){
        alreadyExists = true;
      }
      console.log("alreadyExists: " + alreadyExists);


 if(alreadyExists == true){
    $location.path('chat/' + $scope.ifAlready.chatId);
 } 
 else {
  var messageRef = fbutil.ref('chat/').push({
    temp: 1
  });
  var chatIdTemp = messageRef.toString();
  console.log(chatIdTemp);
  var chatId = chatIdTemp.slice(35);
  console.log(chatId);


  simpleLogin.getUser().then(function(auth){

    var sendee = $stateParams.profileId;  
    var path = 'users/' + $stateParams.profileId;
    $scope.sendeeTemp = fbutil.syncObject(path);

    $scope.sendeeTemp.$loaded().then(function(){
      console.log($stateParams.profileId);
      console.log($scope.sendeeTemp.name);
      fbutil.ref('messages/'+auth.uid+'/'+$stateParams.profileId).set({
        userName: $scope.sendeeTemp.name,
        chatId: chatId
      });
    });


    var path = 'users/' + auth.uid;
    $scope.userTemp = fbutil.syncObject(path);
    $scope.userTemp.$loaded().then(function(){

    console.log($scope.userTemp.name);
      fbutil.ref('messages/'+$stateParams.profileId+'/'+auth.uid).set({
        userName: $scope.userTemp.name,
        chatId: chatId
      });
    });
    $location.path('chat/' + chatId);

  });
 }


 
    });
  });




};



// $scope.getName = function(key){
//   var path = 'users/' + key;
//     $scope.userTemp = fbutil.syncObject(path);
//     $scope.userTemp.$loaded().then(function(){
//       console.log("name: "+$scope.userTemp.name);
//       return $scope.userTemp.name;
//     });
// };

if(!$scope.otherProfile){
  simpleLogin.getUser().then(function(auth){
    //$scope.myInvites = $firebase(fbutil.ref('/invites/'+auth.uid)).$asObject();
    $scope.myInvites = fbutil.syncObject('invites/'+auth.uid);
    console.log($scope.myInvites);
  });
}




});
