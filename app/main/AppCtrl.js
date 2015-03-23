(function(window) {
    'use strict';

    var angular = window.angular;

    angular.module('pttr').controller('AppCtrl', ['$scope','$state', function($scope,$state) {
        $scope.isDashView = function(){
            return $state.is('app.shelter.dashboard') || $state.is('app.user.dashboard');
        }
        $scope.isRegularPage = function(){
            return !$state.is('app.home') === true && !$state.is('app.user.view') === true && !$state.is('app.shelter.view') === true;
        }
        $scope.tabs = [{
            title: 'Goals',
            img: 'image/infoBlock1.jpg',
            url: 'app/main/partials/goals.html'
        }, {
            title: 'Mission',
            img: 'image/infoBlock2.jpg',
            url: 'app/main/partials/mission.html'
        }, {
            title: 'Pttr-Info',
            img: 'image/infoBlock3.png',
            url: 'app/main/partials/pttrinfo.html'
        }, {
            title: 'SignUp',
            img: 'image/infoBlock4.jpg',
            url: 'app/main/partials/signup.html'
        }];
        $scope.currentTab = 'app/main/partials/goals.html';
        $scope.onClickTab= function(tab){
        	$scope.currentTab = tab.url;
        }
        $scope.isActiveTab = function(taburl){
        	return taburl === $scope.currentTab;
        }
        $scope.activate = false;
    }]);

}(window));
