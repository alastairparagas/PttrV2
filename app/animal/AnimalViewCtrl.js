(function(window) {
    var angular = window.angular;

    angular.module('pttr.animal')
        .controller('AnimalViewCtrl', ['$scope', 'AnimalService', 'SharedData', '$sessionStorage', function($scope, AnimalService, SharedData, $sessionStorage) {
            // Moving from the modal to this page causes a feature of the modal to be active
            // this removes that element from the page 
            angular.element('.modal-backdrop').remove();

            // Shared data section
            if(window.Object.keys(AnimalService.getData()).length !== 0){    	
            	 $scope.pet = AnimalService.getData() 
            	 $sessionStorage.pet = AnimalService.getData();
            }else{
            	$scope.pet = $sessionStorage.pet;
            }
        }])
}(window));
