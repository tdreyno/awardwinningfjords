/**
 * View to control the map layer.
 * @constructor
 */
TwinkleView = function() {
  this.particleCanvases_ = {};
  this.maxParticleRadius_ = 5;
  this.boundAnimateTwinkleFrame_ = this.animateTwinkleFrame_.bind(this);

  var self = this;

  var MAP_WIDTH = 2002;
  var MAP_HEIGHT = 1286;
  var mapXratio = 0.7;
  var mapYratio = 0.7;

  var mapDots = [];

  this.scale = 1.0;
  this.color = '#ffecb4';

  var gui = new dat.GUI();
  
  var scaleController = gui.add(this, 'scale').min(0.5).max(5.0);
  scaleController.onChange(function() {
    self.particleCanvases_ = {};
  });

  var colorController = gui.addColor(this, 'color');
  colorController.onChange(function() {
    self.particleCanvases_ = {};
  });

  this.smallDots_ = [];

  var pixelmapLayer = document.createElement('canvas');

  var myMapImg = new Image();
  myMapImg.src = 'pixel-map.png';

  myMapImg.onload = function() {
    pixelmapLayer.width = myMapImg.width;
    pixelmapLayer.height = myMapImg.height;

    var pixelmapCtx = pixelmapLayer.getContext('2d');
    pixelmapCtx.drawImage(myMapImg, 0, 0);

    var pmapImageData = pixelmapCtx.getImageData(0, 0, pixelmapLayer.width,
                        pixelmapLayer.height);

    var len = pmapImageData.data.length;
    for (var i = 0; i < len; i += 4) {
      var r = pmapImageData.data[i],
          g = pmapImageData.data[i + 1],
          b = pmapImageData.data[i + 2],
          a = pmapImageData.data[i + 3];

      if ((r === 0) && (g === 0) && (b === 0) && (a >= 255)) {
        var pixel = Math.ceil(i / 4);
        var x = pixel % pixelmapLayer.width;
        var y = Math.floor(pixel / pixelmapLayer.width);
        mapDots.push({
          x: ~~(x * mapXratio),
          y: ~~(y * mapYratio),

          fadeCounter: Math.random() * 360,
          fadeFrequency: 0.01 + (Math.random() * 0.04),
          hiddenGap: 0,
          rad: 1 + ~~(Math.pow(Math.random(), 8) * 3)
        });
      }
    }

    for (var j = 0; j < mapDots.length; j++) {
      // Only use every 5th dot
      if (j % 3 === 0) {
        self.smallDots_.push(mapDots[j]);
      }
    }

    requestAnimationFrame(self.boundAnimateTwinkleFrame_);
  };

  this.canvas_ = document.createElement('canvas');
  // this.canvas_.style.opacity = 0.75;
  this.canvas_.width = MAP_WIDTH * mapXratio;
  this.canvas_.height = MAP_HEIGHT * mapYratio;
  this.canvas_.style.marginTop = '-250px';
  this.canvas_.style.marginLeft = '-100px';
  document.body.appendChild(this.canvas_);
  this.ctx_ = this.canvas_.getContext('2d');
};

/**
 * Get a shared canvas for each particle size.
 * @private
 * @param {Number} rad Circle radius.
 * @return {Element} The canvas element.
 */
TwinkleView.prototype.getParticleCanvas_ = function(rad) {
  rad = (rad * this.scale).toFixed(2);
  if (!this.particleCanvases_[rad]) {
    var can = document.createElement('canvas');
    can.width = this.maxParticleRadius_ * 2 * this.scale;
    can.height = this.maxParticleRadius_ * 2 * this.scale;
    var ctx = can.getContext('2d');
    var center = (this.maxParticleRadius_ * this.scale) + 0.5;
    ctx.arc(center, center, rad, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    this.particleCanvases_[rad] = can;
  }

  return this.particleCanvases_[rad];
};

/**
 * Animate a single twinkle frame.
 * @private
 * @param {Number} t Timestamp.
 */
TwinkleView.prototype.animateTwinkleFrame_ = function(t) {
  var p, rad, opacity, alpha, img, k, percentage;

  this.ctx_.clearRect(
    0,
    0,
    this.canvas_.width,
    this.canvas_.height
  );

  for (var j = 0; j < this.smallDots_.length; j++) {
    p = this.smallDots_[j];

    if (p.hiddenGap > 0) {
      p.hiddenGap--;
      continue;
    }

    p.fadeCounter += p.fadeFrequency;
    alpha = ((1 + Math.sin(p.fadeCounter)) / 2);
    if (alpha <= 0.01) {
      p.hiddenGap = 10;
      continue;
    }

    if (p.rad >= 3) {
      rad = p.rad * (0.6 + (alpha * 0.4));
      opacity = alpha * 0.7;
    } else {
      rad = p.rad;
      opacity = alpha;
    }

    img = this.getParticleCanvas_(rad);
    this.ctx_.save();
    this.ctx_.globalAlpha = opacity;
    this.ctx_.drawImage(img, p.x - (this.maxParticleRadius_ * this.scale), p.y - (this.maxParticleRadius_ * this.scale));
    this.ctx_.restore();
  }

  requestAnimationFrame(this.boundAnimateTwinkleFrame_);
};