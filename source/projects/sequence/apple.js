function rightNow() {
  if (window['performance'] && window['performance']['now']) {
    return window['performance']['now']();
  } else {
    return +(new Date());
  }
}

var fps          = 30,
    currentFrame = 0,
    totalFrames  = 60,
    img          = document.getElementById("myImage"),
    currentTime  = rightNow();

(function animloop(time){
  var delta = (time - currentTime) / 1000;

  currentFrame += (delta * fps);

  var frameNum = Math.floor(currentFrame);

  if (frameNum >= totalFrames) {
    currentFrame = frameNum = 0;
  }

  requestAnimationFrame(animloop);
  
  img.src = "/projects/sequence/particle-hover/particle_hover_04_000" + (frameNum < 10 ? "0" : "") + frameNum + ".png";
  
  currentTime = time;
})(currentTime);