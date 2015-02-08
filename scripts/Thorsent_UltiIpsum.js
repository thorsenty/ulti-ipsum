(function(window, angular, undefined) {
  "use-strict";

  var DEFAULT_OPTIONS = {
    includeLatin: true,
    paragraphs: 3,
    includeTags: false,
    beginWith: true
  };

  var UltiIpsum = namespace("Thorsent.UltiIpsum");
  extend(UltiIpsum, {

    activeWordList: [],

    generateIpsum: function(paragraphCount, includeLatin, includeTags, beginWith) {

      if (!angular.isNumber(paragraphCount) || paragraphCount < 1 || paragraphCount > 15) {
        paragraphCount = DEFAULT_OPTIONS.paragraphs;
      }
    
      var activeWords = [].concat(UltiIpsum.Words.Ultimate);
      if (includeLatin) {
        activeWords = activeWords.concat(UltiIpsum.Words.Latin);
      }
      UltiIpsum.activeWordList = activeWords;

      var paragraphs = [];
      for (var i = paragraphCount; i > 0; i--) {
        paragraphs.push(UltiIpsum.generateParagraph(includeTags, i === paragraphCount && beginWith));
      }

      return paragraphs;
    },

    generateParagraph: function(includeTags, beginWith) {
      var paragraph = "";
      if (includeTags) {
        paragraph += "<p>";
      }
      var length = Math.floor(Math.random() * UltiIpsum.Words.PARAGRAPH_LENGTH_VARIANCE + UltiIpsum.Words.PARAGRAPH_LENGTH_BASE);
      for (var i = length; i > 0; i--) {
        paragraph += UltiIpsum.generateSentence(i === length && beginWith) + " ";
      }
      if (includeTags) {
        paragraph = paragraph.trim() + "</p>";
      }
      return paragraph.trim();
    },

      generateSentence: function(beginWith) {
      var sentence = "";
      var length = Math.floor(Math.random() * UltiIpsum.Words.SENTENCE_LENGTH_VARIANCE + UltiIpsum.Words.SENTENCE_LENGTH_BASE);
      if (beginWith) {
        sentence = "Ulti ipsum dolor amet ";
      }
      for (var i = length; i > 0; i--) {
        var word = UltiIpsum.getRandomWord();
        // Capitalize start of sentence
        if (i === length && !beginWith) {
          word = word.charAt(0).toUpperCase() + word.substring(1);
        }
        // Randomly add a comma
        if (i >= UltiIpsum.Words.SENTENCE_LENGTH_BASE && i <= length - UltiIpsum.Words.SENTENCE_LENGTH_BASE) {
          if (sentence.indexOf(",") < 0 && Math.floor(Math.random() * 100 + length) > 100) {
            word += ",";
          }
        }
        sentence += word + " ";
      }
      return sentence.trim()+".";
    },

    getRandomWord: function() {
      var wordIndex = Math.floor(Math.random() * UltiIpsum.activeWordList.length);
      return UltiIpsum.activeWordList[wordIndex];
    }
  });

  angular.module('thorsent', ['ngMaterial'])

    .config(["$mdThemingProvider", function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink');
    }])

    .controller("IpsumCtrl", ["$scope", function($scope) {

      $scope.addParagraph = function(includeTags) {
        $scope.paragraphs.push(UltiIpsum.generateParagraph(includeTags, false));
        $scope.options.paragraphs = $scope.paragraphs.length;
      };

      $scope.generate = function(options) {
        $scope.paragraphs = UltiIpsum.generateIpsum(options.paragraphs, options.includeLatin, options.includeTags, options.beginWith);
        $scope.includeTags = options.includeTags;
      };

      $scope.options = DEFAULT_OPTIONS;
      $scope.generate(DEFAULT_OPTIONS);

    }]);

})(window, window.angular);
