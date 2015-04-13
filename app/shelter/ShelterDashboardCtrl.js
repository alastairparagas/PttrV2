(function (window) {
    'use strict';
    var angular = window.angular;
    angular.module('pttr.shelter')
        .controller('ShelterDashboardCtrl', ['$scope', 'ShelterService', 'AnimalService', '$state' ,'SharedData' ,function ($scope, ShelterService, AnimalService, $state,SharedData) {
            $scope.showmenu = false;
            $scope.showCounts = false;
            $scope.cubes_loading = true;
            AnimalService.getAnimals().then(function (animalList) {
                $scope.animals = animalList;
                $scope.cubes_loading = false;
                $scope.speciesList = AnimalService.getSpeciesList();
                $scope.breedList = AnimalService.getBreedList();
                $scope.uniqueList = AnimalService.getAnimalsUnique();
            });
            $scope.isRegularPage = function(){
                return $state.is('app.shelter.view') || $state.is('app.shelter.view');
            }
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
                $scope.currentTab = 'app/shelter/partials/include/_dash_animalList.html';
            }
            $scope.onClickTab = function(tab) {
                $scope.currentTab = tab.url;
                localStorage.setItem("sheltertab", $scope.currentTab);
                localStorage.setItem("changeview", true);
            };
            $scope.isActiveTab = function(taburl) {
                return taburl === $scope.currentTab;
            };

            // sharing data between controllers through service
            $scope.passData = function(data){
               AnimalService.setData(data);
            }
            
        }]);
}(window));
