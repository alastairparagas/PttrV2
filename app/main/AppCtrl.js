(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr').controller('AppCtrl', ['$scope', function ($scope) {
        $scope.showmenu = false;
        $scope.activate = function(){
        	$scope.showmenu = !$scope.showmenu;
        }
    }]);
    
}(window));