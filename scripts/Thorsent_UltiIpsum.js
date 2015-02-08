(function(window, angular, undefined) {
  "use-strict";

  angular.module('thorsent', ['ngMaterial'])

    .config(["$mdThemingProvider", function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('red');
    }])

    .controller("IpsumCtrl", ["$scope", function($scope) {
      $scope.title = "Ultimate Ipsum";
    }]);

})(window, window.angular);
