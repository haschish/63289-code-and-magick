'use strict';
(function () {
  var debounce = function (fun, ms) {
    var timer;
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        fun.apply(this, arguments);
        timer = null;
      }, ms);
    };
  };

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
    getValuesOf: getValuesOf,
    debounce: debounce
  };
})();
