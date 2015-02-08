(function(window, angular, undefined) {
  "use-strict";

  var DEFAULT_OPTIONS = {
    includeLatin: true,
    paragraphs: 3,
    includeTags: false,
    beginWith: true
  };

  angular.module('thorsent', ['ngMaterial'])

    .config(["$mdThemingProvider", function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('red');
    }])

    .controller("IpsumCtrl", ["$scope", function($scope) {
      
      $scope.options = DEFAULT_OPTIONS;

      $scope.generate = function() {
        console.log($scope.options);
      };

    }]);

})(window, window.angular);
