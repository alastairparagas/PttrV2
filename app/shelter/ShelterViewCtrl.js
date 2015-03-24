(function(window) {
    'use strict';
    var angular = window.angular;
    angular.module('pttr.user')
        .controller('ShelterViewCtrl', ['$scope', 'ShelterService', 'AnimalService', function($scope, ShelterService, AnimalService) {
            AnimalService.getAnimals().then(function (animalList) {
                $scope.animals = animalList;
                $scope.speciesList = AnimalService.getSpeciesList();
                $scope.breedList = AnimalService.getBreedList();
                $scope.uniqueList = AnimalService.getAnimalsUnique();
            });
            $scope.enterImage = false;
            $scope.showmenu = false;
            $scope.tabs = ShelterService.getTabs;
            $scope.alternativeTabs = ShelterService.getAlternateTabs;
            $scope.populate = function (animalObject) {
                $scope.animal = animalObject;
            };
            // Makes the current tab stick to the page which the user selected on the view
            if (localStorage.getItem("changeview") === "true") {
                $scope.currentTab = localStorage.getItem("sheltertab");
            } else {
                $scope.currentTab = 'app/shelter/partials/dash_animalList.html';
            }
            $scope.onClickTab = function(tab) {
                $scope.currentTab = tab.url;
                localStorage.setItem("sheltertab", $scope.currentTab);
                localStorage.setItem("changeview", true);
            };
            $scope.isActiveTab = function(taburl) {
                return taburl === $scope.currentTab;
            };
            $scope.activate = function() {
                $scope.showmenu = !$scope.showmenu;
            };
        }])
}(window));
