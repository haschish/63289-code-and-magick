'use strict';
var blockSetup = document.querySelector('.setup');
var NAMES = [
  'Иван',
  'Хуан Субастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

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

var generatePersons = function (num) {
  var persons = [];
  for (var i = 0; i < num; i++) {
    persons.push({
      name: getRandomItem(NAMES) + ' ' + getRandomItem(SURNAMES),
      coatColor: getRandomItem(COAT_COLORS, getValuesOf(persons, 'coatColor')),
      eyesColor: getRandomItem(EYES_COLORS, getValuesOf(persons, 'eyesColor'))
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

var onBlockSetupEscKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
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


var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupClose = blockSetup.querySelector('.setup-close');
var fragmentWizards = getFragmentWizards(generatePersons(4));
var setupUserName = blockSetup.querySelector('.setup-user-name');
var setupWizardCoat = blockSetup.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = blockSetup.querySelector('.setup-wizard .wizard-eyes');
var setupFireballWrap = blockSetup.querySelector('.setup-fireball-wrap');

blockSetup.querySelector('.setup-similar-list').appendChild(fragmentWizards);
blockSetup.querySelector('.setup-similar').classList.remove('hidden');

setupOpenIcon.addEventListener('click', function () {
  openBlockSetup();
});
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode !== ENTER_KEYCODE) {
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
setupWizardCoat.addEventListener('click', function () {
  var currentFill = setupWizardCoat.style.fill;
  setupWizardCoat.style.fill = getRandomItem(COAT_COLORS, [currentFill]);
});
setupWizardEyes.addEventListener('click', function () {
  var currentFill = setupWizardEyes.style.fill;
  setupWizardEyes.style.fill = getRandomItem(EYES_COLORS, [currentFill]);
});
setupFireballWrap.addEventListener('click', function () {
  setupFireballWrap.style.backgroundColor = getRandomItem(FIREBALL_COLORS);
});
