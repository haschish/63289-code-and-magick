'use strict';
(function () {
  var blockSetup = document.querySelector('.setup');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupClose = blockSetup.querySelector('.setup-close');
  var setupUserName = blockSetup.querySelector('.setup-user-name');

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
})();
