(function(window){
	'use strict';
	var angular = window.angular;
	
	angular.module('pttr.user',[])
	.controller('UserDashboardCtrl', ['$scope', function($scope){
		$scope.showmenu = false;
        $scope.activate = function(){
        	$scope.showmenu = !$scope.showmenu;
        }
	}]);
	
}(window));