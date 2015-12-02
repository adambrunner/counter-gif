'use strict';
var GIFEncoder = require('gifencoder');
var Canvas = require('canvas');
var fs = require('fs');
var moment = require('moment');

class Counter {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.encoder = this.initEncoder();
    this.readStream = this.encoder.createReadStream();

    this.canvas = new Canvas(this.width, this.height);
    this.context = this.canvas.getContext('2d');
  }

  initEncoder() {
    var encoder = new GIFEncoder(this.width, this.height);

    encoder.start();
    encoder.setRepeat(0);
    encoder.setFrameRate(1);
    encoder.setQuality(10);

    return encoder;
  }

  addFrameToCounter() {
    this.encoder.addFrame(this.context);
  }

  getCounterBinary() {
    this.encoder.finish();

    return this.readStream.read();
  }

  generate(date) {
    var remaining = Math.floor((date - new Date()) / 1000);
    this.render(remaining);
    return this.getCounterBinary();
  }

  render(seconds) {
    this.context.font = "40px monospace";
    this.context.textBaseline = "hanging";

    for (let i = 0; i < 90; i++) {
      var currentSeconds = seconds - i;

      var remainingHours = Math.floor(currentSeconds / 3600);
      var remaining = currentSeconds % 3600;
      var remainingMinutes = Math.floor(remaining / 60);
      var remainingSeconds = remaining % 60;


      this.renderFrame(this.padString(remainingHours)+':'+this.padString(remainingMinutes)+':'+this.padString(remainingSeconds));
    }
  }

  renderFrame(text) {
    var x = 0;
    var y = 0;

    this.context.fillStyle = '#ffffff';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = '#000000';
    this.context.fillText(text, x, y);

    this.addFrameToCounter();
  }

  padString(value) {
    return value < 10 ? '0' + value : value;
  }
}

module.exports = function*() {
  this.status = 200;
  this.set('Content-Type', 'image/gif');
  var params = this.params;
  var untilDate = new Date(params.year, params.month - 1, params.day, params.hour, params.minute, params.second);

  var counter = new Counter(200, 200);
  this.body = counter.generate(untilDate);
};
