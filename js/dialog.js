'use strict';
(function () {
  var blockSetup = document.querySelector('.setup');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupClose = blockSetup.querySelector('.setup-close');
  var setupUserName = blockSetup.querySelector('.setup-user-name');
  var setupFile = blockSetup.querySelector('input[type="file"]');

  var onBlockSetupEscKeydown = function (evt) {
    if (evt.keyCode === window.keycodes.ESC && evt.target !== setupUserName) {
      closeBlockSetup();
    }
  };

  var openBlockSetup = function () {
    blockSetup.classList.remove('hidden');
    document.addEventListener('keydown', onBlockSetupEscKeydown);
  };

  var closeBlockSetup = function () {
    blockSetup.classList.add('hidden');
    blockSetup.style.left = '';
    blockSetup.style.top = '';
    document.removeEventListener('keydown', onBlockSetupEscKeydown);
  };

  setupOpenIcon.addEventListener('click', function () {
    openBlockSetup();
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode !== window.keycodes.ENTER) {
      return;
    }

    var classList = evt.target.classList;
    if (classList.contains('setup-open-icon')) {
      openBlockSetup();
    } else if (classList.contains('setup-close')) {
      closeBlockSetup();
    }
  });
  setupClose.addEventListener('click', function () {
    closeBlockSetup();
  });

  setupFile.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
      offsetLeft: blockSetup.offsetLeft,
      offsetTop: blockSetup.offsetTop
    };

    var onDocumentMousemove = function (moveEvt) {
      dragged = true;
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      blockSetup.style.left = (startCoords.offsetLeft + shift.x) + 'px';
      blockSetup.style.top = (startCoords.offsetTop + shift.y) + 'px';
    };

    var onDocumentMouseup = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onDocumentMousemove);
      document.removeEventListener('mouseup', onDocumentMouseup);

      if (dragged) {
        var onClickSetupFile = function (clickEvt) {
          clickEvt.preventDefault();
          setupFile.removeEventListener('click', onClickSetupFile);
        };
        setupFile.addEventListener('click', onClickSetupFile);
      }
    };

    document.addEventListener('mousemove', onDocumentMousemove);
    document.addEventListener('mouseup', onDocumentMouseup);
  });

  window.dialog = {
    close: closeBlockSetup
  };
})();
