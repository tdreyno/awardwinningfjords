function drawFrame(ctx, image, width, height, num) {
  var offsetX = 0,
      offsetY = num * height;
  
  ctx.drawImage(image, offsetX, offsetY, width, height, 0, 0, width, height);
}

var img = new Image();
img.onload = function() {
  var fps          = 30,
      currentFrame = 0,
      totalFrames  = 60,
      canvas       = document.getElementById("canvas"),
      ctx          = canvas.getContext("2d"),
      currentTime  = new Date().getTime();
  
  (function animloop(time){
    var delta = (time - currentTime) / 1000;
    
    currentFrame += (delta * fps);
    
    var frameNum = Math.floor(currentFrame);
    
    if (frameNum >= totalFrames) {
      currentFrame = frameNum = 0;
    }
    
    requestAnimationFrame(animloop);
    
    drawFrame(ctx, img, 104, 124, frameNum);
    currentTime = time;
  })(currentTime);
};
img.src = "/projects/sequence/particle-hover-frames.jpg";