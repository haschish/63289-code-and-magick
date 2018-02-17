'use strict';
(function () {
  var generatePersons = function (num) {
    var persons = [];
    for (var i = 0; i < num; i++) {
      persons.push({
        name: window.utils.getRandomItem(window.consts.NAMES) + ' ' + window.utils.getRandomItem(window.consts.SURNAMES),
        coatColor: window.utils.getRandomItem(window.consts.COAT_COLORS, window.utils.getValuesOf(persons, 'coatColor')),
        eyesColor: window.utils.getRandomItem(window.consts.EYES_COLORS, window.utils.getValuesOf(persons, 'eyesColor'))
      });
    }

    return persons;
  };

  var getFragmentWizards = function (array) {
    var wizard = document.querySelector('#similar-wizard-template').content;
    var fragment = document.createDocumentFragment();

    array.forEach(function (item) {
      var clone = wizard.cloneNode(true);

      clone.querySelector('.setup-similar-label').textContent = item.name;
      clone.querySelector('.wizard-coat').style.fill = item.colorCoat;
      clone.querySelector('.wizard-eyes').style.fill = item.colorEyes;

      fragment.appendChild(clone);
    });

    return fragment;
  };

  var setArtifactsCellOutline = function (style) {
    var items = setupArtifacts.querySelectorAll('.setup-artifacts-cell');
    items.forEach(function (item) {
      item.style.outline = style;
    });
  };

  var onLoadData = function (data) {
    var wizards = [];
    for(var i = 0; i < 4; i++) {
      wizards.push(window.utils.getRandomItem(data, wizards));
    }

    var fragmentWizards = getFragmentWizards(wizards);
    blockSetup.querySelector('.setup-similar-list').appendChild(fragmentWizards);
    blockSetup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onErrorBackend = function (msg) {
    alert(msg);
  };

  var blockSetup = document.querySelector('.setup');
  // var fragmentWizards = getFragmentWizards(generatePersons(4));
  var setupWizardCoat = blockSetup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = blockSetup.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballWrap = blockSetup.querySelector('.setup-fireball-wrap');
  var setupArtifactsShop = blockSetup.querySelector('.setup-artifacts-shop');
  var setupArtifacts = blockSetup.querySelector('.setup-artifacts');
  var setupForm = blockSetup.querySelector('form');
  var draggedItem = null;

  backend.load(onLoadData, onErrorBackend);

  // blockSetup.querySelector('.setup-similar-list').appendChild(fragmentWizards);
  // blockSetup.querySelector('.setup-similar').classList.remove('hidden');

  setupWizardCoat.addEventListener('click', function () {
    var currentFill = setupWizardCoat.style.fill;
    setupWizardCoat.style.fill = window.utils.getRandomItem(window.consts.COAT_COLORS, [currentFill]);
  });
  setupWizardEyes.addEventListener('click', function () {
    var currentFill = setupWizardEyes.style.fill;
    setupWizardEyes.style.fill = window.utils.getRandomItem(window.consts.EYES_COLORS, [currentFill]);
  });
  setupFireballWrap.addEventListener('click', function () {
    setupFireballWrap.style.backgroundColor = window.utils.getRandomItem(window.consts.FIREBALL_COLORS);
  });

  setupArtifactsShop.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    setArtifactsCellOutline('2px dashed red');
  });

  setupArtifacts.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });
  setupArtifacts.addEventListener('drop', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
    if (evt.target.tagName.toLowerCase() === 'div') {
      evt.target.appendChild(draggedItem);
    }
    setArtifactsCellOutline('');
  });
  setupArtifacts.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() === 'div') {
      evt.target.style.backgroundColor = 'yellow';
    }
  });
  setupArtifacts.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(setupForm);
    var onLoad = function () {

    };
    backend.save(
      data,
      function () {
        window.dialog.close();
      },
      onErrorBackend
    );
  });
})();

