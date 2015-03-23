(function(window){
	'use strict';
	var angular = window.angular;
	angular.module('pttr.user')
	.controller('UserViewCtrl',['$scope','UserService','AnimalService', function($scope,UserService,AnimalService){
		AnimalService.getAnimals().then(function(animalList) {
                    $scope.animals = animalList;
            });
		$scope.animalLiked = [{
                likes: 23,
                pet: "Cat",
                name:"feral"
            }, {
                likes: 23,
                pet: "Cat",
                name:"feral"
            }, {
                likes: 23,
                pet: "Cat",
                name:"feral"
            }, {
                likes: 23,
                pet: "Cat",
                name:"feral"
            }, {
                likes: 23,
                pet: "Cat",
                name:"feral"
            }, {
                likes: 23,
                pet: "Cat",
                name:"feral"
            }, {
                likes: 23,
                pet: "Cat",
                name:"feral"
            }, {
                likes: 23,
                pet: "Cat",
                name:"feral"
            }, {
                likes: 23,
                pet: "Cat",
                name:"feral"
            }]
            $scope.userDonations = [{
                amount: 23,
                shelter: "Miami research facility"
            }, {
                amount: 23,
                shelter: "Miami research facility"
            }, {
                amount: 23,
                shelter: "Miami research facility"
            }, {
                amount: 23,
                shelter: "Miami research facility"
            }, {
                amount: 23,
                shelter: "Miami research facility"
            }, {
                amount: 23,
                shelter: "Miami research facility"
            }, {
                amount: 23,
                shelter: "Miami research facility"
            }, {
                amount: 23,
                shelter: "Miami research facility"
            }]
	}])
}(window));