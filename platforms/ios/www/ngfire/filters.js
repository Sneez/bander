'use strict';

/* Filters */

angular.module('bander.filters', [])
   .filter('interpolate', ['version', function(version) {
      return function(text) {
         return String(text).replace(/\%VERSION\%/mg, version);
      }
   }])
   .filter('trust', ['$sce', function($sce){
      return function(url){
         return $sce.trustAsResourceUrl(url);
      };
   }])

   .filter('stateFilter', function(stateConvert){
         return function(text){
            return stateConvert(text);
         }
   })   
   .filter('youtubeFilter', function(){
         return function(text){
         var code = text.slice(16);
         var youtube = "//www.youtube.com/embed/";
         return youtube.concat(code);         }
   })

   .filter('reverse', function() {
      return function(items) {
         return items.slice().reverse();
      };
   });
