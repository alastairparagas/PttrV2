(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('pttr.shelter')
	.directive('backImg', function(){
		return function(scope,element,attrs){
			var url = attrs.backImg;
			element.css({
				'background' : 'url(' + url + ') center center no-repeat',
    			'-webkit-background-size' : 'cover',
			    '-moz-background-size': 'cover',
			    '-o-background-size': 'cover',
    			'background-size' : 'cover' 
			})
		}
	})
}(window));