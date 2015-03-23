(function(window) {
    'use strict';

    var angular = window.angular;

    angular.module('pttr.shelter').service('ShelterService', [function() {
        this.getTabs = [{
            tab: 'MainDash',
            url: 'app/shelter/partials/include/_dash_main.html'
        }, {
            tab: 'Animal List',
            url: 'app/shelter/partials/include/_dash_animalList.html'
        }, {
            tab: 'Add Pet',
            url: 'app/shelter/partials/include/_addPet.html'
        }, {
            tab: 'Liked Animals',
            url: 'app/shelter/partials/include/_dash_Liked.html'
        }];
    }]);

}(window));
