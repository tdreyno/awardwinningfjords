--- 
title: "Image Sequences: Let Me Count The Ways"
date: 2012-03-08
---

[this]: http://lab.victorcoulon.fr/css/path-menu/
[that]: http://clear.youyuxi.com/
[we've been using it for decades]: http://en.wikipedia.org/wiki/Sprite_(computer_graphics)
[iPad product page]: http://www.apple.com/ipad/
[a zip of the entire 60 frame sequence]: /projects/sequence/particle-hover.zip
[a 560kb Sprite Sheet containing all the frames]: /projects/sequence/particle-hover-frames.jpg
[the Sprite Sheet]: /projects/sequence/particle-hover-frames.jpg
[support CSS3 Animations]: http://caniuse.com/#feat=css-animation
[the entire output here]: https://gist.github.com/2002296
[requestAnimationFrame]: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
[requestAnimationFrame polyfill]:  http://paulirish.com/2011/requestanimationframe-for-smart-animating/
[View the Pure CSS Animation Image Sequence Demo]: /projects/sequence/css.html
[View the Canvas Animation Image Sequence Demo]: /projects/sequence/canvas.html
[View the Javascript DOM Animation Image Sequence Demo]: /projects/sequence/elem.html
[View the Apple-style Animation Image Sequence Demo]: /projects/sequence/apple.html

Everyone's very excited by their "Pure CSS" [this] and "Pure CSS" [that], but if we are front-end developers really want to start taking on traditionally Flash use-cases, we're going to need to step out animation game up a notch.

Enter the Image Sequence. An Image Sequence is exactly what it sounds like, a series of images, each representing a single frame of an animation. Usually these will be exported from a high-level application like Adobe After Effects. For memory and performance reasons, these images are usually combined into a single Sprite Sheet. You may have heard of this technique, because [we've been using it for decades].

This week I implemented Image Sequences in 3 different ways. And just yesterday, Apple started using another technique on their [iPad product page].

## The Animation

I'll be animating a "bouncing" particle. Here's a look at the first frame:

<img src="/projects/sequence/particle-hover/particle_hover_04_00000.png">

Each frame is 104x124. 

Here's [a zip of the entire 60 frame sequence].

Finally, here's [a 560kb Sprite Sheet containing all the frames]. We'll be using this in all the examples except for Apple's newest implementation.

## 1: Pure <del>CSS</del>Sass Animation

Did I say CSS? I'm way too lazy for that, let's use Sass.

The current versions of all desktop browsers, except IE, [support CSS3 Animations]. The syntax for this in CSS looks like the following (you'll need to add your own vendor prefixes):

    @keyframes animate-particle {
      0%   { opacity: 0; }
      100% { opacity: 1; }
    }

This will define a simple fadeIn animation which you can control on each element which implements it:

    #my-particle {
      width: 104px;
      height: 124px;
      background: url(particle-hover_04_00000.png);
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-name: animate-particle;
    }

This will run the 1 second animation infinitely.

So, how can we use this to animate our Sprite Sheet? We'll simply animate the background-position offset of the element 1 frame at a time. If you opened [the Sprite Sheet], you'll remember we've stacked all 60 frames vertically. So our keyframes would look something like: 

    @keyframes animate-particle {
      0%    { background-position: 0 0; }
      1.69% { background-position: 0 -124px; }
      3.39% { background-position: 0 -248px; }
      ...
    }

We need to animate across 60 frames over the 100% range of the animation, which means each frame is 1.695%. This could get nasty and verbose very quickly. Let's use Sass:

    @keyframes animate-particle {
      @for $i from 0 through 59 {
        $s: ($i * 100) / 59 + "%";
        #{$s} { background-position: 0 ($i * -124px); }
      }
    }

You can see [the entire output here]. Now, let's reference that on our element. We've double checked with our designer that the animation is at 30fps, so that means our 60 frames should last 2 seconds.

    #my-particle {
      width: 104px;
      height: 124px;
      background: url(particle-hover-frames.jpg);
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: step-start;
      animation-name: animate-particle;
    }

There is one piece of special sauce above and that is:

    animation-timing-function: step-start;

Normally, CSS animations will attempt to tween between states, which is great for smooth transitions in opacity or scale, but we need the animate to jump immediately from frame to frame. That is what `step-start` does.

#### [View the Pure CSS Animation Image Sequence Demo].<br><br>

## 2: Canvas Animation

The Canvas element is just a blank slate you can draw pixels on to. Drawing image data from individual files or sprite sheets is very easy. We'll use the same Sprite Sheet from above.

    function drawFrame(ctx, image, width, height, num) {
      var offsetX = 0,
          offsetY = num * height;
      
      ctx.drawImage(image, 
        offsetX, offsetY, 
        width, height, 
        0, 0, 
        width, height);
    }

The above function will take a Canvas context, an Image object, the dimensions of each frame and the frame to draw. We'll use [requestAnimationFrame] for smooth animations.
    
    var fps          = 30,
        currentFrame = 0,
        totalFrames  = 60,
        img          = document.getElementById("frames"),
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

#### [View the Canvas Animation Image Sequence Demo].<br><br>

## 3: Javascript DOM Animation

The next solution is to implement the CSS version in Javascript. We'll use the exact same approach. Take a div element, animate its background image. The advantage here is that this will work in every browser (assuming you have the [requestAnimationFrame polyfill]).

    #my-particle2 {
      width: 104px;
      height: 124px;
      background: url(particle-hover-frames.jpg);
    }

Similar CSS, minus the CSS Animation code. Now for the JS (which is similar to the Canvas implementation): 

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

#### [View the Javascript DOM Animation Image Sequence Demo].<br><br>

## 4: Apple-style IMG Animation

Finally, let's take a look at Apple's implementation. They actually use the more straightforward approach. The preload the individual images, and directly set the chosen frame on a normal Image element. Simple, eh?

Traditionally, this approach has been considered too slow to smoothly animate, but it looks like the combination of requestAnimationFrame, Webkit's incredible speed, Apple's ability to target Safari and the decline of older IE versions has made this technique "fast enough".

Here's an implementation:

    var fps          = 30,
        currentFrame = 0,
        totalFrames  = 60,
        img          = document.getElementById("myImage"),
        currentTime  = new Date().getTime();

    (function animloop(time){
      var delta = (time - currentTime) / 1000;

      currentFrame += (delta * fps);

      var frameNum = Math.floor(currentFrame);

      if (frameNum >= totalFrames) {
        currentFrame = frameNum = 0;
      }

      requestAnimationFrame(animloop);

      img.src = "/projects/sequence/particle-hover/particle_hover_04_000" +
        (frameNum < 10 ? "0" : "") + frameNum + ".png";
  
      currentTime = time;
    })(currentTime);
    
#### [View the Apple-style Animation Image Sequence Demo].<br><br>

## Conclusion

Each of the above techniques has a specific use-case. 

Pure CSS *should* be GPU accelerated and lets you keep all your animations together in CSS. The downside is that you have to generate all the frame percentages in CSS (or Sass) and that it only works in modern browsers. I've also encountered performance issues where the CSS method is causing redraw/repaint events which slow other animations on the screen.

The Canvas implementation is great for games, where you'll be drawing most of your components directly to the canvas.

The Javascript DOM method works best when you want to load the large Sprite Sheet and avoid too many HTTP requests.

The Apple-style method will probably become very popular. You can start the animation after the page loads and use it as a form of progressive enhancement.