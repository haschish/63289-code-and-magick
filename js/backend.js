'use strict';
(function () {
  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('POST', 'https://js.dump.academy/code-and-magick');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
