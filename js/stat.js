'use strict';
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_PADDING = 20;
var CLOUD_PADDING_TOP = 10;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var FONT_GAP = 20;

var renderCloud = function (ctx) {
  var shadowOffset = 10;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_X + shadowOffset, CLOUD_Y + shadowOffset, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = 'white';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderTitle = function (ctx) {
  var x = CLOUD_X + CLOUD_PADDING;
  var yLine1 = CLOUD_Y + CLOUD_PADDING_TOP + FONT_GAP;
  var yLine2 = yLine1 + FONT_GAP;

  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', x, yLine1);
  ctx.fillText('Список результатов:', x, yLine2);
};

var renderBar = function (ctx, names, times) {
  var initY = CLOUD_Y + CLOUD_HEIGHT - CLOUD_PADDING;
  var initX = CLOUD_X + CLOUD_PADDING;
  var maxValue = times.reduce(function (val1, val2) {
    return Math.max(val1, val2);
  });

  names.forEach(function (name, i) {
    var time = parseInt(times[i], 10);
    var x = initX + i * (BAR_WIDTH + BAR_GAP);
    var rectHeight = parseInt((BAR_HEIGHT - FONT_GAP) / maxValue * time, 10);
    var rectY = initY - FONT_GAP - rectHeight;
    var scoreY = rectY - FONT_GAP / 2;

    ctx.fillStyle = 'black';
    ctx.fillText(name, x, initY);
    ctx.fillText(time, x, scoreY);
    ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
    ctx.fillRect(x, rectY, BAR_WIDTH, rectHeight);
  });
};

window.renderStatistics = function (ctx, names, times) {
  ctx.font = '16px PT Mono';

  renderCloud(ctx);
  renderTitle(ctx);
  renderBar(ctx, names, times);
};
