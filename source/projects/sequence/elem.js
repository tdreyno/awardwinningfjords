var fps          = 30,
    currentFrame = 0,
    totalFrames  = 60,
    elem         = document.getElementById("my-particle2"),
    currentTime  = new Date().getTime();

(function animloop(time){
  var delta = (time - currentTime) / 1000;

  currentFrame += (delta * fps);

  var frameNum = Math.floor(currentFrame);

  if (frameNum >= totalFrames) {
    currentFrame = frameNum = 0;
  }

  requestAnimationFrame(animloop);

  elem.style.backgroundPosition = "0 -" + (frameNum * 124) + "px";
  
  currentTime = time;
})(currentTime);