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
      clone.querySelector('.wizard-coat').style.fill = item.coatColor;
      clone.querySelector('.wizard-eyes').style.fill = item.eyesColor;

      fragment.appendChild(clone);
    });

    return fragment;
  };

  var blockSetup = document.querySelector('.setup');
  var fragmentWizards = getFragmentWizards(generatePersons(4));
  var setupWizardCoat = blockSetup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = blockSetup.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballWrap = blockSetup.querySelector('.setup-fireball-wrap');

  blockSetup.querySelector('.setup-similar-list').appendChild(fragmentWizards);
  blockSetup.querySelector('.setup-similar').classList.remove('hidden');

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
})();

