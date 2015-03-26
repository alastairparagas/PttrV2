(function (window) {
    'use strict';
    var angular = window.angular;
    
    angular.module('pttr.user')
        .controller('UserDashboardCtrl', ['$scope', 'UserService', 'AnimalService', function ($scope, UserService, AnimalService) {
            
            AnimalService.getAnimals().then(function (animalList) {
                $scope.animals = animalList;
                $scope.speciesList = AnimalService.getSpeciesList();
                $scope.breedList = AnimalService.getBreedList();
                $scope.uniqueList = AnimalService.getAnimalsUnique();
            });
            $scope.AnimalTypeSelected = function (selection) {
                if (selection) {
                    return selection;
                } else {
                    $scope.breedListSelection = undefined;
                }
                return [];
            };
            $scope.showmenu = false;
            
            $scope.activate = function () {
                $scope.showmenu = !$scope.showmenu;
            };
            $scope.populate = function (animalObject) {
                $scope.animal = animalObject;
            };

            $scope.passData = function(data){
               AnimalService.setData(data);
            }
        }]);
    
}(window));
