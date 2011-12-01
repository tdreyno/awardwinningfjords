var addParticle, debugPaths, gui, onFrame, onMouseMove, particles, path, self;

path = new Path();

path.add(view.center);

path.strokeColor = "black";

path.strokeWidth = 1;

this.totalParticles = 50;

this.lineLength = 50;

particles = [];

addParticle = function() {
  var circle, randomSize, targetPoint;
  targetPoint = view.center + (Size.random() * view.size) - (view.size / 2);
  randomSize = (Math.random() * 11.0) + 2.0;
  circle = new Path.Circle(targetPoint, randomSize);
  circle.fillColor = new HsbColor(Math.random() * 360, 1, 1);
  circle.strokeColor = "black";
  circle.strokeWidth = 1;
  return particles.push({
    view: circle,
    speed: 0.01 + Math.random() * 0.05,
    target: targetPoint,
    offset: (Point.random() * 100.0) - 50.0
  });
};

debugPaths = [];

onFrame = function(event) {
  var direction, distance, i, j, k, nearestDist, nearestIndex, nearestPoint, nextPoint, particle, segment, _i, _len, _len2, _ref, _ref2, _ref3, _ref4, _results;
  if (particles.length < totalParticles) {
    for (i = _ref = particles.length; _ref <= totalParticles ? i < totalParticles : i > totalParticles; _ref <= totalParticles ? i++ : i--) {
      addParticle();
    }
    boom();
  } else if (totalParticles < particles.length) {
    for (i = totalParticles, _ref2 = particles.length; totalParticles <= _ref2 ? i < _ref2 : i > _ref2; totalParticles <= _ref2 ? i++ : i--) {
      particles[0].view.remove();
      particles[0].view = null;
      particles.shift();
    }
    boom();
  }
  for (k = 0, _ref3 = debugPaths.length; 0 <= _ref3 ? k < _ref3 : k > _ref3; 0 <= _ref3 ? k++ : k--) {
    debugPaths[k].remove();
    debugPaths[k] = null;
  }
  debugPaths = [];
  _results = [];
  for (_i = 0, _len = particles.length; _i < _len; _i++) {
    particle = particles[_i];
    direction = particle.view.position;
    nearestIndex = null;
    nearestDist = Infinity;
    _ref4 = path.segments;
    for (j = 0, _len2 = _ref4.length; j < _len2; j++) {
      segment = _ref4[j];
      distance = segment.getPoint().getDistance(particle.view.position);
      if (distance < nearestDist) {
        nearestDist = distance;
        nearestIndex = j;
      }
    }
    if (nearestDist > 200) continue;
    if (nearestIndex != null) {
      nearestPoint = path.segments[nearestIndex].getPoint();
      direction += nearestPoint - particle.view.position;
      if (nearestIndex < path.segments.length - 1) {
        nextPoint = path.segments[nearestIndex + 1].getPoint();
        direction += (nextPoint - particle.view.position) * 2;
      }
      if (nearestIndex + 1 < path.segments.length - 1) {
        nextPoint = path.segments[nearestIndex + 2].getPoint();
        direction += (nextPoint - particle.view.position) * 3;
      }
      if (nearestIndex + 2 < path.segments.length - 1) {
        nextPoint = path.segments[nearestIndex + 3].getPoint();
        direction += (nextPoint - particle.view.position) * 4;
      }
    }
    _results.push(particle.view.position += (direction + particle.offset - particle.view.position) * particle.speed);
  }
  return _results;
};

tool.fixedDistance = 30;

self = this;

onMouseMove = function(event) {
  var diff, i;
  path.add(event.point);
  diff = path.segments.length - self.lineLength;
  if (diff > 1) {
    for (i = 0; 0 <= diff ? i < diff : i > diff; 0 <= diff ? i++ : i--) {
      path.removeSegment(0);
    }
  }
  return path.smooth();
};

this.boom = function() {
  var i, particle, randomSize, targetPoint, _i, _len, _ref, _results;
  for (i = _ref = path.segments.length; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
    path.removeSegment(i);
  }
  _results = [];
  for (_i = 0, _len = particles.length; _i < _len; _i++) {
    particle = particles[_i];
    targetPoint = view.center + (Size.random() * view.size) - (view.size / 2);
    randomSize = (Math.random() * 11.0) + 2.0;
    particle.view.position = targetPoint;
    _results.push(particle.view.size = randomSize);
  }
  return _results;
};

gui = new dat.GUI();

gui.add(this, "boom");

gui.add(this, "totalParticles").min(1);

gui.add(this, "lineLength").min(2);
