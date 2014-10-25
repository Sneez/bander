'use strict';

angular.module('bander')

.directive('loadVid', function($timeout, ytConvert) {
   return {
   	 restrict: "A",

     scope: true,
     link: function(scope, elem, attrs) {

     	scope.$watch('user', function(user){
     	    if( user.$loaded ){
     			console.log("blarg");
          		user.$loaded().then(function(){
     				$timeout(function(){
     					elem.attr('src', ytConvert(user.stream_url));
     				}, 0);
	     		});
     		}
     	});
     }

   };
})
.directive('appVersion', function(version) {
   return {
   	 restrict: "E",

     scope: true,
     link: function(scope, elem, attrs) {
     	return elem.text(version);

     }

   };
});
