var animate, camera, cols, currentTime, geometry, gravity, gridSizeX, gridSizeY, imageHeight, imageWidth, init, mesh, mouse, physics, render, renderer, rows, scene;

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

gridSizeX = 60;

gridSizeY = 60;

cols = imageWidth / gridSizeX;

rows = imageHeight / gridSizeY;

init = function() {
  var col, i, material, nextIndex, p, particles, row, s, stiffness, texture, vert, _i, _len;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 960 / 600, 1, 10000);
  camera.position.z = 500;
  scene.add(camera);
  geometry = new THREE.PlaneGeometry(imageWidth, imageHeight, cols, rows);
  geometry.dynamic = true;
  texture = THREE.ImageUtils.loadTexture("images/image.jpg");
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
    physics.particles.push(p);
  }
  mouse = new Particle();
  mouse.fixed = true;
  mouse.active = false;
  return renderer.domElement.addEventListener("mousemove", function(e) {
    var lastParticle;
    if (!mouse.active) {
      lastParticle = physics.particles[physics.particles.length - 1 - (cols / 2)];
      s = new Spring(mouse, lastParticle, 30, 1.0);
      physics.springs.push(s);
      mouse.active = true;
    }
    return mouse.pos.set(e.clientX - (960 / 2), -(e.clientY - (600 / 2) - 100), 100);
  });
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
