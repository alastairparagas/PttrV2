(function(window){
	var angular = window.angular;
	angular.module('pttr.animal')
	.factory('SharedData', function(){
		var data = {
			animal : {}
		};
		return{
			getAnimalObj: function(){
				return data.animal;
			},
			setAnimalObj: function(animalObj){
				data.animal = animalObj;
			}
		}
	})
}(window));