'use strict';
// Параметры облака
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW = 'rgba(0, 0, 0, 0.7)';
// Отступы
var GAP = 10;
var BAR_GAP = 60;
var TOP_GAP = 250;
var LEFT_GAP = 40;
// Шрифт и шкалы
var FONT = '16px PT Mono';
var FONT_HEIGHT = 18;
var FONT_COLOR = '#000';
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
// Функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
// Нахождение максимального элемента в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0] || 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};
// Расположение элементов по осям
var getPositionX = function (serialNumber) {
  return LEFT_GAP + CLOUD_X + (BAR_WIDTH + BAR_GAP) * serialNumber;
};

var getPositionY = function (numberOfIndents) {
  return TOP_GAP - GAP * numberOfIndents;
};

var getPositionTextX = function () {
  return CLOUD_X + GAP * 2;
};

var getPositionTextY = function () {
  return CLOUD_Y * 4;
};
// Отрисовка окна с гистограммой и результатами победителей
window.renderStatistics = function (ctx, players, times) {
  // Параметры окна
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW);// Тень
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);// Облако

  ctx.fillStyle = FONT_COLOR;

  var maxTime = getMaxElement(times);
  // Параметры текста и столбцов
  for (var i = 0; i < players.length; i++) {
    ctx.font = FONT;
    ctx.fillText('Ура вы победили!', getPositionTextX(), getPositionTextY());
    ctx.fillText('Список результатов:', getPositionTextX(), getPositionTextY() + FONT_HEIGHT);
    ctx.fillText(Math.round(times[i]), getPositionX(i), getPositionY(2) + (-BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random().toFixed(1) + ')';// Цвет других игроков
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';// Цвет основного игрока
    }
    ctx.fillRect(getPositionX(i), getPositionY(1), BAR_WIDTH, (-BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(players[i], getPositionX(i), CLOUD_Y + TOP_GAP);
  }
};
