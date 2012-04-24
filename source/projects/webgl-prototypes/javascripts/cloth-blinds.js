var animate, camera, cols, currentTime, geometry, go, gravity, gridSizeX, gridSizeY, imageHeight, imageWidth, init, mesh, mouse, physics, render, renderer, rows, scene;

scene = null;

camera = null;

physics = null;

renderer = null;

geometry = null;

mouse = null;

gravity = null;

mesh = null;

imageWidth = 600;

imageHeight = 300;

gridSizeX = 600;

gridSizeY = 100;

cols = imageWidth / gridSizeX;

rows = imageHeight / gridSizeY;

init = function() {
  var col, geometry2, i, material, material2, mesh2, nextIndex, p, particles, row, s, stiffness, texture, texture2, vert, _i, _len, _results;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 960 / 600, 1, 10000);
  camera.position.z = 500;
  scene.add(camera);
  geometry2 = new THREE.PlaneGeometry(imageWidth * 1.1, imageHeight, 1, 1);
  texture2 = THREE.ImageUtils.loadTexture("/images/image2.png");
  material2 = new THREE.MeshBasicMaterial({
    map: texture2
  });
  mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.z = -100;
  scene.add(mesh2);
  geometry = new THREE.PlaneGeometry(imageWidth, imageHeight, cols, rows);
  geometry.dynamic = true;
  texture = THREE.ImageUtils.loadTexture("/images/image.jpg");
  material = new THREE.MeshBasicMaterial({
    map: texture
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(960, 600);
  document.getElementById("container").appendChild(renderer.domElement);
  physics = new Physics(new Verlet());
  gravity = new ConstantForce(new Vector(0.0, -80.0));
  physics.behaviours.push(gravity);
  particles = (function() {
    var _i, _len, _ref, _results;
    _ref = geometry.vertices;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vert = _ref[_i];
      p = new Particle(0.1);
      p.moveTo(new Vector(vert.position.x, vert.position.y, 0));
      p.fixed = vert.position.y === (imageHeight / 2);
      _results.push(p);
    }
    return _results;
  })();
  stiffness = 1.0;
  _results = [];
  for (i = _i = 0, _len = particles.length; _i < _len; i = ++_i) {
    p = particles[i];
    if (p.pos.x < (imageWidth / 2) && particles[i + 1]) {
      s = new Spring(p, particles[i + 1], gridSizeX, stiffness);
      physics.springs.push(s);
    }
    row = Math.floor(i / cols);
    col = i % cols;
    nextIndex = ((row + 1) * cols) + col + 1;
    if (particles[nextIndex]) {
      s = new Spring(p, particles[nextIndex], gridSizeY, stiffness);
      physics.springs.push(s);
    }
    _results.push(physics.particles.push(p));
  }
  return _results;
};

currentTime = null;

animate = function(t) {
  var delta;
  delta = 0;
  if (currentTime) {
    delta = t - currentTime;
  }
  TWEEN.update(t);
  requestAnimationFrame(animate);
  physics.step();
  render();
  return currentTime = t;
};

render = function() {
  var i, lastParticle, lastVertex, _i, _ref;
  renderer.render(scene, camera);
  for (i = _i = 0, _ref = physics.particles.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    lastParticle = physics.particles[i];
    lastVertex = geometry.vertices[i];
    lastVertex.position.x = lastParticle.pos.x;
    lastVertex.position.y = lastParticle.pos.y;
    lastVertex.position.z = lastParticle.pos.z;
  }
  return geometry.__dirtyVertices = true;
};

init();

animate();

go = function(row) {
  var currentPos, endIndex, i, p, row2, startIndex, startingY, startingZ, tween;
  if (row == null) {
    row = 2;
  }
  startingY = null;
  startingZ = null;
  startIndex = row * (cols + 1);
  endIndex = startIndex + cols;
  if (startingY == null) {
    startingY = physics.particles[startIndex].pos.y;
  }
  if (startingZ == null) {
    startingZ = physics.particles[startIndex].pos.z;
  }
  row2 = (function() {
    var _i, _len, _ref, _results;
    _ref = physics.particles;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      p = _ref[i];
      if ((startIndex <= i && i <= endIndex)) {
        _results.push(p);
      }
    }
    return _results;
  })();
  currentPos = {
    y: 0
  };
  tween = new TWEEN.Tween(currentPos).to({
    y: -100
  }, 2000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function(delta) {
    var newY, newZ, p, _i, _len, _results;
    newY = startingY + (gridSizeY * ((row - 1) * 2) * delta);
    newZ = startingZ + (40 * delta);
    _results = [];
    for (_i = 0, _len = row2.length; _i < _len; _i++) {
      p = row2[_i];
      p.pos.y = newY;
      _results.push(p.pos.z = newZ);
    }
    return _results;
  }).onComplete(function() {});
  tween.start();
  return;
};

document.body.addEventListener("dblclick", function() {
  return go();
});
