(function(window) {
    var angular = window.angular;
    angular.module("pttr.shelter")
        .controller('ShelterEditCtrl', ['$scope', 'ShelterService', function($scope, ShelterService) {
            $scope.showmenu = false;
            $scope.tabs = ShelterService.getTabs;
            // Makes the current tab stick to the page which the user selected on the view
            if (localStorage.getItem("changeview") === "true") {
                $scope.currentTab = localStorage.getItem("sheltertab");
            } else {
                $scope.currentTab = 'app/shelter/partials/dash_animalList.html';
            }
            $scope.onClickTab = function(tab) {
                $scope.currentTab = tab.url;
                localStorage.setItem("sheltertab", $scope.currentTab);
                localStorage.setItem("changeview", true);
            };
            $scope.isActiveTab = function(taburl) {
                return taburl === $scope.currentTab;
            };
             $scope.activate = function () {
                $scope.showmenu = !$scope.showmenu;
            };
        }])
}(window));
