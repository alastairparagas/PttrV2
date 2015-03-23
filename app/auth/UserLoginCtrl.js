(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr.user').controller('LoginCtrl', ['$scope', '$location', '$state', 'AuthService', function ($scope, $location, $state, AuthService) {
        
        $scope.login = {
            data: {
                email: "",
                password: ""
            }
        };
        
        var loginType = $location.path().split("/")[2];
        
        $scope.login.submit = function () {
            $scope.login.status = {
                type: "info",
                msg: "Logging In. Please wait"
            };
            if (loginType === "individual") {
                AuthService.loginIndividual($scope.login.data.email, $scope.login.data.password).then(
                    function (success) {
                        $scope.login.status = {
                            type: "success",
                            msg: success
                        };
                        $state.go('individualAuth.dashboard');
                    },
                    function (error) {
                        $scope.login.status = {
                            type: "danger",
                            msg: error
                        };
                    }
                );
            } else if (loginType === "shelter") {
                AuthService.loginShelter($scope.login.data.email, $scope.login.data.password).then(
                    function (success) {
                        $scope.login.status = {
                            type: "success",
                            msg: success
                        };
                        $state.go('shelterAuth.dashboard');
                    },
                    function (error) {
                        $scope.login.status = {
                            type: "danger",
                            msg: error
                        };
                    }
                );
            }
        };
        
        $scope.closeAlert = function () {
            if (angular.isObject($scope.login.status)) {
                delete $scope.login.status;
            }
        };
        
    }]);
    
}(window));