(function(window) {
    'use strict';

    var angular = window.angular;

    angular.module('pttr').controller('AppCtrl', ['$scope','$state', function($scope,$state) {
        $scope.isDashView = function(){
            return $state.is('app.shelter.dashboard') || $state.is('app.user.dashboard');
        }
        $scope.isRegularPage = function(){
            return $state.is('app.home') || $state.is('app.user.view') || $state.is('app.shelter.view')
            || $state.is('app.shelter.edit') || $state.is('app.shelter.edit');
        }
        $scope.tabs = [{
            title: 'Goals',
            img: 'image/infoBlock1.jpg',
            url: 'app/main/partials/include/_goals.html'
        }, {
            title: 'Mission',
            img: 'image/infoBlock2.jpg',
            url: 'app/main/partials/include/_mission.html'
        }, {
            title: 'Pttr-Info',
            img: 'image/infoBlock3.png',
            url: 'app/main/partials/include/_pttrinfo.html'
        }, {
            title: 'SignUp',
            img: 'image/infoBlock4.jpg',
            url: 'app/main/partials/include/_signup.html'
        }];
        $scope.currentTab = 'app/main/partials/include/_goals.html';
        $scope.onClickTab= function(tab){
        	$scope.currentTab = tab.url;
        }
        $scope.isActiveTab = function(taburl){
        	return taburl === $scope.currentTab;
        }
        $scope.activate = false;
    }]);

}(window));
