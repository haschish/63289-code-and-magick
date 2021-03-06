'use strict';
(function () {
  var getRandomItem = function (array, exclude) {
    if (exclude && exclude.length) {
      array = array.filter(function (item) {
        return exclude.indexOf(item) === -1;
      });
    }

    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  var getValuesOf = function (array, key) {
    return array.map(function (item) {
      return item[key];
    });
  };

  window.utils = {
    getRandomItem: getRandomItem,
    getValuesOf: getValuesOf
  };
})();
