(function (window) {
    'use strict';
    var angular = window.angular;
    angular.module('pttr.shelter')
        .controller('ShelterDashboardCtrl', ['$scope', 'ShelterService', 'AnimalService', function ($scope, ShelterService, AnimalService) {
            $scope.showmenu = false;
            $scope.showCounts = false;
            AnimalService.getAnimals().then(function (animalList) {
                $scope.animals = animalList;
                $scope.speciesList = AnimalService.getSpeciesList();
                $scope.breedList = AnimalService.getBreedList();
                $scope.uniqueList = AnimalService.getAnimalsUnique();
            });
            $scope.AnimalTypeSelected = function (selection) {
                if(selection) {
                    return selection;
                } else {
                    $scope.breedListSelection = undefined;
                }
                return [];
            };
            $scope.activate = function () {
                $scope.showmenu = !$scope.showmenu;
            };
            $scope.populate = function (animalObject) {
                $scope.animal = animalObject;
            };
            $scope.enterImage = false;
            $scope.sideClicked = false;
            $scope.tabs = ShelterService.getTabs;
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
            
        }]);
}(window));
