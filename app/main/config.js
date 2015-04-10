(function (window) {
    'use strict';

    var angular = window.angular,
        app = angular.module('pttr', ['ui.router',
                                      'ngSanitize',
                                      'ui.bootstrap',
                                      'firebase',
                                      'pttr.firebase',
                                      'pttr.auth',
                                      'pttr.animal',
                                      'pttr.user',
                                      'pttr.shelter',
                                      'ngStorage']);

    app.run(['AuthService', function (AuthService) {
        AuthService.initialize();
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

            .state('app.individual', {
                url: '/user',
                abstract: true,
                template: '<ui-view/>'
            })
            .state('app.individual.login', {
                url: '/login',
                // controller: 'UserLoginCtrl',
                templateUrl: 'app/auth/partials/userLogin.html'
            })
            .state('app.individual.register', {
                url: '/register',
                // controller: 'UserRegisterCtrl',
                templateUrl: 'app/auth/partials/userRegister.html'
            })
            .state('app.individual.dashboard', {
                url: '/dashboard',
                controller: 'UserDashboardCtrl',
                templateUrl: 'app/user/partials/dashboard.html',
                data: {
                    authType: 'individual'
                }
            })
            .state('app.individual.view', {
                url: '/:id',
                controller: 'UserViewCtrl',
                templateUrl: 'app/user/partials/view.html'
            })
            .state('app.individual.edit', {
                url: '/:id/edit',
                controller: 'UserEditCtrl',
                templateUrl: 'app/user/partials/edit.html',
                data: {
                    authType: 'individual'
                }
            })

            .state('app.shelter', {
                url: '/shelter',
                abstract: true,
                template: '<ui-view/>'
            })
            .state('app.shelter.login', {
                url: '/login',
                // controller: 'ShelterLoginCtrl',
                templateUrl: 'app/auth/partials/shelterLogin.html'
            })
            .state('app.shelter.register', {
                url: '/register',
                // controller: 'ShelterRegisterCtrl',
                templateUrl: 'app/auth/partials/shelterRegister.html'
            })
            .state('app.shelter.dashboard', {
                url: '/dashboard',
                controller: 'ShelterDashboardCtrl',
                templateUrl: 'app/shelter/partials/dashboard.html',
                data: {
                    authtype: 'shelter'
                }
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
                abstract: true,
                template: '<ui-view/>'
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
            });

        $urlRouterProvider.otherwise('/app/home');

    }]);

}(window));