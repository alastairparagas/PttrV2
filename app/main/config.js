(function (window) {
    'use strict';
    
    var angular = window.angular,
        app = angular.module('pttr', ['ui.router', 'ui.bootstrap', 'firebase', 'pttr.firebase', 'pttr.auth', 'pttr.animal', 'pttr.user', 'pttr.shelter']);
    
    app.run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {
        
    }]);
    
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        
        $stateProvider
        
            .state('app', {
                url: '/app',
                abstract: true,
                controller: 'AppCtrl',
                templateUrl: 'app/main/partials/app.html'
            })
        
            .state('app.home', {
                url: '/home',
                templateUrl: 'app/main/partials/home.html'
            })
            .state('app.contact', {
                url: '/contact',
                templateUrl: 'app/main/partials/contact.html'
            })
            
            .state('app.user', {
                url: '/user',
                abstract: true
            })
            .state('app.user.view', {
                url: '/:id',
                controller: 'UserViewCtrl',
                templateUrl: 'app/user/partials/view.html'
            })
            .state('app.user.edit', {
                url: '/:id/edit',
                controller: 'UserEditCtrl',
                templateUrl: 'app/user/partials/edit.html',
                data: {
                    authType: 'user'
                }
            })
        
            .state('app.shelter', {
                url: '/shelter',
                abstract: true
            })
            .state('app.shelter.view', {
                url: '/:id',
                controller: 'ShelterViewCtrl',
                templateUrl: 'app/shelter/partials/view.html'
            })
            .state('app.shelter.edit', {
                url: '/:id/edit',
                controller: 'ShelterEditCtrl',
                templateUrl: 'app/shelter/partials/edit.html',
                data: {
                    authType: 'shelter'
                }
            })
        
            .state('app.animal', {
                url: '/animal',
                abstract: true
            })
            .state('app.animal.view', {
                url: '/:id',
                controller: 'AnimalViewCtrl',
                templateUrl: 'app/animal/partials/view.html'
            })
            .state('app.animal.edit', {
                url: '/:id/edit',
                controller: 'AnimalEditCtrl',
                templateUrl: 'app/animal/partials/edit.html',
                data: {
                    authType: 'shelter'
                }
            })
        
            .state('app.user.dashboard', {
                url: '/dashboard',
                controller: 'UserDashboardCtrl',
                templateUrl: 'app/user/partials/dashboard.html',
                data: {
                    authType: 'user'
                }
            })
            .state('app.shelter.dashboard', {
                url: '/dashboard',
                controller: 'ShelterDashboardCtrl',
                templateUrl: 'app/shelter/partials/dashboard.html',
                data: {
                    authtype: 'shelter'
                }
            });
        
        $urlRouterProvider.otherwise('/app/home');
        
    }]);
    
}(window));