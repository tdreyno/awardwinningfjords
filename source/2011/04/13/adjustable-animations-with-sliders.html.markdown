--- 
title: Adjustable Animations with Sliders
date: 2011-04-13
---

[Flow]: http://getflow.com

Quick question? What is the perfect amount of time to animate an element on a page? jQuery defaults to 400ms, which sounds short, but ends up being pretty perfect for most occasions. It gets the job done and then it gets out of the way. 

However, it shouldn't surprise you that designers have opinions on motion and we're just now reaching the point where motion is becoming important on the web. READMORE Back in the day, 37Signals would just set the background of an element to yellow and call it a day. If you take a look at [Flow], you'll see some very designed motion. Closing a task results in the checkbox animating to a state, then it picks up and animates along an arc to drop into the "completed" box in your sidebar.

Okay, so, what's the perfect timing for that animation? There are tools for prototyping motion, most notably Adobe Flash, but usually you're designer is going to want to look over your shoulder and tweak the animation until it "feels right."

The solution is something I've seen friends in the old-school OpenGL motion build into their dev workflow. Every time they've got a motion variable (duration, size, color, wobble, randomness, etc), they setup a control to adjust the variable. Who wants to change integers in OpenGL and recompile? Like so many things, it's time to re-learn tricks from the desktop world if we're going to move forward.

Here, below is the most basic example. I have a square that is animating back and forth and changing width and height. In a more complicated example, it might arc or have several animations queued up. I've used a shiny new HTML5 <tt>range</tt> element and each time the animation loops, it checks the value to define it's duration.

    <!-- Ranges from 0-4000, with integer steps. Defaults to 400 -->
    <input type="range" min="0" max="4000" step="1" value="400">

The animation looks like:

    $elem.animate({ left: 480, width: 100, height: 100 }, {
      duration: $("input[type=range]").val()
    });

Simple enough. If I were implementing an animation, vaguely defined in a PSD, I'd setup something like this and then let the designer have a field day. Developers love round numbers and math, but the "best" timing may actually be the combination of an esoteric easing function and a duration of 962.

This gets even more interesting if you're using something like WebGL, Three.js or Box2d.js. Adjust physics engines on the fly makes finding the perfect balance a cinch.

Demo
====

Here we have a little animating square, a slider to control the duration and a bunch of easing options. Go ahead, play around and find the "sweet spot."

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
<script>
  $.getScript("/javascripts/jquery.easing.1.3.js", function() {

    $(function($) {
      $(".range").change(function() {
        $(".speed").text($(this).val());
      }).change();

      function getEasing() {
        return $(".easing").val();
      }

      function getSliderValue() {
        return parseInt($(".range").val(), 10);
      }

      function animateRight() {
        $(".box").stop().animate({ left: 380, width: 100, height: 100 }, {
          duration: getSliderValue(), 
          easing:   getEasing(),
          complete: function() {
            setTimeout(animateLeft, 750);
          }
        });
      }

      function animateLeft() {
        $(".box").stop().animate({ left: 0, width: 50, height: 50 }, {
          duration: getSliderValue(), 
          easing:   getEasing(),
          complete: function() {
            setTimeout(animateRight, 750);
          }
        });
      }

      animateRight();
    });
  });
</script>

<div class="demo" style="width: 600px; height: 300px; position: relative; overflow: hidden;">
  Duration: <span class="speed"></span><br />
  <input class="range" type="range" min="0" max="4000" step="1" value="1400" style="width: 300;" /><br />
  Easing: <select class="easing">
    <option>swing</option>
    <option>easeInQuad</option>
    <option>easeOutQuad</option>
    <option>easeInOutQuad</option>
    <option>easeInCubic</option>
    <option>easeOutCubic</option>
    <option>easeInOutCubic</option>
    <option>easeInQuart</option>
    <option>easeOutQuart</option>
    <option>easeInOutQuart</option>
    <option>easeInQuint</option>
    <option>easeOutQuint</option>
    <option>easeInOutQuint</option>
    <option>easeInSine</option>
    <option>easeOutSine</option>
    <option>easeInOutSine</option>
    <option>easeInExpo</option>
    <option>easeOutExpo</option>
    <option>easeInOutExpo</option>
    <option>easeInCirc</option>
    <option>easeOutCirc</option>
    <option>easeInOutCirc</option>
    <option>easeInElastic</option>
    <option>easeOutElastic</option>
    <option>easeInOutElastic</option>
    <option>easeInBack</option>
    <option>easeOutBack</option>
    <option>easeInOutBack</option>
    <option>easeInBounce</option>
    <option selected>easeOutBounce</option>
    <option>easeInOutBounce</option>
  </select><br />

  <div class="box" style="width: 50px; height: 50px; background: red; position: absolute; top: 75px; left: 10px;"></div>
</div>