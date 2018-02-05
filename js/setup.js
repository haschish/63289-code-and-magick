'use strict';
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

var blockSetup = document.querySelector('.setup');
blockSetup.classList.remove('hidden');
var persons = generatePersons(4);
var fragmentWizards = getFragmentWizards(persons);
blockSetup.querySelector('.setup-similar-list').appendChild(fragmentWizards);
blockSetup.querySelector('.setup-similar').classList.remove('hidden');
