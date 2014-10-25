(function() {
   'use strict';

   /* Services */

   angular.module('bander.services', [])

      // put your services here!
      // .service('serviceName', ['dependency', function(dependency) {}]);

     .factory('messageList', function(fbutil, simpleLogin) {
       // return fbutil.syncArray('messages', {limit: 10, endAt: null});
       return function(auth){
    	  return fbutil.syncObject('messages/'+auth.uid);
       };

     })

     .factory('ytConvert', [function() {
       return function(link){
       	var code = link.slice(16);
       	var youtube = "//www.youtube.com/embed/";
       	return youtube.concat(code);
      };
     }])

.factory('mapStyle', [function () {
	var _style = [
  {
  },{
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "on" },
      { "hue": "#00f6ff" },
      { "saturation": -100 },
      { "gamma": 0.31 },
      { "lightness": 81 },
      { "weight": 1.6 }
    ]
  },{
    "elementType": "labels",
    "stylers": [
      { "visibility": "on" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "hue": "#00ccff" },
      { "saturation": 1 },
      { "lightness": 1 },
      { "gamma": 1 },
      { "color": "#FFFFFF" },
      { "visibility": "on" },
      { "weight": 0.8 }
    ]
  },{
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "saturation": -100 },
      { "gamma": 0.19 },
      { "lightness": 74 }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "simplified" },
      { "saturation": -100 },
      { "gamma": 2.58 },
      { "lightness": 76 },
      { "weight": 1.8 }
    ]
  },{
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "simplified" }
    ]
  }
];

	return {
		get: function(){
			return _style;
		}
	};
}])

     .factory('stateConvert', [function() {
       return function(state){

     	switch (state) {
     	 case 'AL': return 'Alabama'; break;
         case 'AK': return 'Alaska'; break;
         case 'AR': return 'Arkansas'; break;
         case 'AZ': return 'Arizona'; break;
         case 'CA': return 'California'; break;
         case 'CO': return 'Colorado'; break;
         case 'CT': return 'Connecticut'; break;
         case 'DE': return 'Delaware'; break;
         case 'FL': return 'Florida'; break;
         case 'GA': return 'Georgia'; break;
         case 'HI': return 'Hawaii'; break;
         case 'ID': return 'Idaho'; break;
         case 'IL': return 'Illinois'; break;
         case 'IN': return 'Indiana'; break;
         case 'IA': return 'Iowa'; break;
         case 'KS': return 'Kansas'; break;
         case 'KY': return 'Kentucky'; break;
         case 'LA': return 'Louisiana'; break;
         case 'ME': return 'Maine'; break;
         case 'MD': return 'Maryland'; break;
         case 'MA': return 'Massachusetts'; break;
         case 'MI': return 'Michigan'; break;
         case 'MN': return 'Minnesota'; break;
         case 'MS': return 'Mississippi'; break;
         case 'MO': return 'Missouri'; break;
         case 'MT': return 'Montana'; break;
         case 'NE': return 'Nebraska'; break;
         case 'NH': return 'New Hampshire'; break;
         case 'NV': return 'Nevada'; break;
         case 'NJ': return 'New Jersey'; break;
         case 'NM': return 'New Mexico'; break;
         case 'NY': return 'New York'; break;
         case 'NC': return 'North Carolina'; break;
         case 'ND': return 'North Dakota'; break;
         case 'OH': return 'Ohio'; break;
         case 'OK': return 'Oklahoma'; break;
         case 'OR': return 'Oregon'; break;
         case 'PA': return 'Pennsylvania'; break;
         case 'RI': return 'Rhode Island'; break;
         case 'SC': return 'South Carolina'; break;
         case 'SD': return 'South Dakota'; break;
         case 'TN': return 'Tennessee'; break;
         case 'TX': return 'Texas'; break;
         case 'UT': return 'Utah'; break;
         case 'VT': return 'Vermont'; break;
         case 'VA': return 'Virginia'; break;
         case 'DC': return 'District of Columbia'; break;
         case 'WA': return 'Washington'; break;
         case 'WV': return 'West Virginia'; break;
         case 'WI': return 'Wisconsin'; break;
         case 'WY': return 'Wyoming'; break;
     	}
      };
     }]);

})();

