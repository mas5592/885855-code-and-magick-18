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

  var wizardContainer = document.querySelector('.setup-similar');
  var wizardList = wizardContainer.querySelector('.setup-similar-list');

  wizardList.appendChild(likeWizards);
  wizardContainer.classList.remove('hidden');
};

renderSetupWindow();


var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
// Открытие по нажатию .setup-open
setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
});
// Закрытие по нажатию .setup-close
setupClose.addEventListener('click', function () {
  setup.classList.add('hidden');
});
// Закрытие окна по нажатию esc, если фокус на форме ввода имени, то не закрывается
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && setupUserName !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
// Открытие окна настройки персонажа по нажатию кнопки ENTER
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
// Закрытие окна настройки персонажа по нажатию кнопки ENTER
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Ограничения наименования персонажа
setupUserName.addEventListener('invalid', function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
});
// Меняем цвета персонажа
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var fireball = document.querySelector('.setup-fireball-wrap');

var wizardCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var wizardEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

function getElementColor(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getElementColor(wizardCoatColor);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getElementColor(wizardEyesColor);
});

fireball.addEventListener('click', function () {
  fireball.style.backgroundColor = getElementColor(fireballColor);
});
