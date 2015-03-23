(function(window){
    'use strict';
	var angular = window.angular;
	angular.module('pttr.user')
	.controller('ShelterViewCtrl',['$scope','ShelterService','AnimalService', function($scope,ShelterService,AnimalService){
		AnimalService.getAnimals().then(function(animalList) {
                    $scope.animals = animalList;
            });
		$scope.animalLiked = [{
                likes: 23,
                pet: "Cat"
            }, {
                likes: 23,
                pet: "Cat"
            }, {
                likes: 23,
                pet: "Cat"
            }, {
                likes: 23,
                pet: "Cat"
            }, {
                likes: 23,
                pet: "Cat"
            }, {
                likes: 23,
                pet: "Cat"
            }, {
                likes: 23,
                pet: "Cat"
            }, {
                likes: 23,
                pet: "Cat"
            }, {
                likes: 23,
                pet: "Cat"
            }]
	}])
}(window));