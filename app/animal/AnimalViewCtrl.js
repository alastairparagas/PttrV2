(function(window){
	var angular = window.angular;

	angular.module('pttr.animal')
	.controller('AnimalViewCtrl', ['$scope','AnimalService', 'SharedData',  function($scope,AnimalService,SharedData){
		// Moving from the modal to this page causes a feature of the modal to be active
		// this removes that element from the page 
		angular.element('.modal-backdrop').remove();

		// Shared data section				
		$scope.pet = AnimalService.getData();
	}])
}(window));