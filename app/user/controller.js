(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('UserCtrl',[])
	.controller('FirstCtrl',[function($scope){
		$scope.test = "test works";
	}])
}(window));