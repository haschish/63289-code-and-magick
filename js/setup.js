'use strict';
(function () {
  var similarWizards = [];
  var getSimilarWizardNode = function(data) {
    var wizard = document.querySelector('#similar-wizard-template').content;
    var clone = wizard.cloneNode(true);

    clone.querySelector('.setup-similar-label').textContent = data.name;
    clone.querySelector('.wizard-coat').style.fill = data.colorCoat;
    clone.querySelector('.wizard-eyes').style.fill = data.colorEyes;
    return clone;
  };

  var getCurrentWizard = function () {
    return {
      colorCoat: setupWizardCoat.style.fill,
      colorEyes: setupWizardEyes.style.fill || 'black'
    }
  };

  var getRankSimilarityOfWizards = function(obj1, obj2) {
    var rank = 0;
    rank += (obj1.colorCoat === obj2.colorCoat) ? 2 : 0;
    rank += (obj1.colorEyes === obj2.colorEyes) ? 1 : 0;

    return rank;
  };

  var getSimilarWizards = function (num) {
    var currentWizard = getCurrentWizard();
    return similarWizards.slice(0)
      .sort(function (left, right) {
        var leftRank = getRankSimilarityOfWizards(currentWizard, left);
        var rightRank = getRankSimilarityOfWizards(currentWizard, right);
        return rightRank-leftRank;
      })
      .slice(0, num);
  };

  var renderSimilarWizards = function() {
    var similarWizards = getSimilarWizards(4);
    var similarList = blockSetup.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    similarWizards.forEach(function (item) {
      fragment.appendChild(getSimilarWizardNode(item));
    });
    similarList.innerHTML = '';
    similarList.appendChild(fragment);
    blockSetup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var debounceRenderSimilarWizards = window.utils.debounce(renderSimilarWizards, 500);

  var setArtifactsCellOutline = function (style) {
    var items = setupArtifacts.querySelectorAll('.setup-artifacts-cell');
    items.forEach(function (item) {
      item.style.outline = style;
    });
  };

  var onLoadData = function (data) {
    similarWizards = data;
    renderSimilarWizards();
  };

  var onErrorBackend = function (msg) {
    var node = document.querySelector('.error-backend');
    if (!node) {
      node = document.createElement('div');
      node.classList.add('error-backend');
      document.body.insertAdjacentElement('afterbegin', node);
    }

    node.textContent = msg;
  };

  var removeErrorBackend = function () {
    var node = document.querySelector('.error-backend');
    if (node) {
      document.body.removeChild(node);
    }
  };

  var blockSetup = document.querySelector('.setup');
  var setupWizard = blockSetup.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = blockSetup.querySelector('.setup-fireball-wrap');
  var setupArtifactsShop = blockSetup.querySelector('.setup-artifacts-shop');
  var setupArtifacts = blockSetup.querySelector('.setup-artifacts');
  var setupForm = blockSetup.querySelector('form');
  var draggedItem = null;

  window.backend.load(onLoadData, onErrorBackend);


  setupWizardCoat.addEventListener('click', function () {
    var currentFill = setupWizardCoat.style.fill;
    setupWizardCoat.style.fill = window.utils.getRandomItem(window.consts.COAT_COLORS, [currentFill]);
    debounceRenderSimilarWizards();
  });
  setupWizardEyes.addEventListener('click', function () {
    var currentFill = setupWizardEyes.style.fill;
    setupWizardEyes.style.fill = window.utils.getRandomItem(window.consts.EYES_COLORS, [currentFill]);
    debounceRenderSimilarWizards();
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
    removeErrorBackend();
    var data = new FormData(setupForm);
    var onLoad = function () {
      window.dialog.close();
    };
    window.backend.save(data, onLoad, onErrorBackend);
  });
})();

