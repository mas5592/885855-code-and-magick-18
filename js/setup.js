'use strict';

var WizardsRandom = {
  quantity: 4,
  wizardName: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', ' Люпита', 'Вашингтон'],
  wizardSurname: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green'],
};

var getRandomData = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateRandomData = function (wizardsRandom) {
  var wizards = [];

  for (var i = 0; i < wizardsRandom.quantity; i++) {
    wizards.push({
      name: getRandomData(wizardsRandom.wizardName) + ' ' + getRandomData(wizardsRandom.wizardSurname),
      coatColor: getRandomData(wizardsRandom.coatColor),
      eyesColor: getRandomData(wizardsRandom.eyesColor)
    });
  }

  return wizards;
};

var renderWizard = function (template, wizard) {
  var otherWizard = template.cloneNode(true);

  otherWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  otherWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  otherWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return otherWizard;
};

var getLikeWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizardTemplate, wizards[i]));
  }

  return fragment;
};

var renderSetupWindow = function () {
  var wizards = generateRandomData(WizardsRandom);
  var likeWizards = getLikeWizards(wizards);

  var setupWindow = document.querySelector('.setup');
  var wizardContainer = setupWindow.querySelector('.setup-similar');
  var wizardList = wizardContainer.querySelector('.setup-similar-list');

  wizardList.appendChild(likeWizards);
  wizardContainer.classList.remove('hidden');
  setupWindow.classList.remove('hidden');
};

renderSetupWindow();

