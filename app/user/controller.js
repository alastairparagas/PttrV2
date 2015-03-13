(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('UserDashboardCtrl',[])
	.controller('FirstCtrl',[function($scope){
		$scope.showmenu = false;
        $scope.activate = function(){
        	$scope.showmenu = !$scope.showmenu;
        }
	}])
}(window));