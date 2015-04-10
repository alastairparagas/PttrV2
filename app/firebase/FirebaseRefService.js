(function (window) {
    'use strict';
    
    var angular = window.angular,
        Firebase = window.Firebase,
        config = window.config,
        FirebaseRefService;
    
    angular.module('pttr.firebase').service('FirebaseRefService', FirebaseRefService);
    
    FirebaseRefService = function () {
        return new Firebase(config.firebaseUrl);
    };
    
}(window));