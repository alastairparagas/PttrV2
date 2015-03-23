(function(window) {
    var angular = window.angular;
    angular.module("pttr.shelter")
        .controller('ShelterEditCtrl', ['$scope', function($scope) {
            $scope.tabs = [{
                tab: 'MainDash',
                url: 'app/shelter/partials/dash_main.html'
            }, {
                tab: 'Animal List',
                url: 'app/shelter/partials/dash_animalList.html'
            }, {
                tab: 'Donations',
                url: 'app/shelter/partials/dash_donation.html'
            }, {
                tab: 'Liked Animals',
                url: 'app/shelter/partials/dash_Liked.html'
            }];
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
        }])
}(window));
