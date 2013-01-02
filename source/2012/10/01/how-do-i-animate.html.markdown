---
title: ! 'How Do I: Animate'
blog_editor_id: 9
---

This is the first piece in a series of "How Do I" articles. Since that phrase can be taken multiple ways, let me explain: this is how I, Thomas Reynolds, accompish certain tasks. This isn't about comparing multiple technique or even justifying my prefered approach. This is a brain dump.

### Animation Philosophy

When animating, either massive thousand-part experiences or single on-off effects, I prioritize framerate and the ability get the right "feel" from the animation. Both goals are about Control, so I do nearly all of my animations in Javascript instead of CSS.

Javascript allows me to control all of my animations from a single place, a Tween engine, and run them from a single place, `requestAnimationFrame`. Using a Tween engine, instead of CSS, allows me to define very specific timing functions which influence the "feel" of the animation. Does is bounce? Move as if gravity is pulling it down? These are important. Simply defaulting to jQuery's "swing" or CSS's "ease-in-out" aren't good enough.

You can look at the recent [Nike+ Fuelstream](/2012/09/23/fuelstream.html) project for an example of a site using tons of Javascript animations.

### tween.js

My preferred Tweening engine is [tween.js](https://github.com/sole/tween.js/), but pretty much any of them will do. jQuery's built-in, generic, `$.animate` function is worth a look too.

Using tween.js, you can construct animations like so:

	var elem = document.getElementById('box');
	var tween = new TWEEN.Tween({ height: 100 })
      .to({ height: 200 }, 1000)
      .easing(TWEEN.Easing.Elastic.InOut)
      .onUpdate(function() {
        elem.style.height = this.height + 'px';
      }).start();

You may notice, I'm using `TWEEN.Easing.Elastic.InOut`. Its timing curve looks like:

![Elastic.InOut](/images/elastic.png)

You can see that it travels below and above the lines, representing 0 and 1. For a long time, this kind of timing was impossible with CSS transitions. That's changed, but some of the more mathmatically complicated easing methods still have to be done in Javascript. [Here are the timing curves for all of tween.js' built-in functions](http://sole.github.com/tween.js/examples/03_graphs.html).

### requestAnimationFrame

Of course, if you actually ran this code, nothing would happen. That's because tween.js needs to be told "what time is it" to know which point in the animation we are at. For that, I use `requestAnimationFrame`.

`requestAnimationFrame` is a browser feature which will run our code at 60 frames per second. As a nice fallback, if it detects that the browser is too slow to run our animation at 60fps, it will automatically fallback to 30fps. Using a `requestAnimationFrame` loop syncs our animations so they all paint at once and at the same frequency as our displays. Simply put, this is the best possible way to run animations if you prioritize framerate.

We can run the above Tween with `requestAnimationFrame` like so:

	function animate(timestamp) {
      if (!timestamp) {
        timestamp = +(new Date());
      }
      
      // Update/draw all Tweens
	  TWEEN.update(timestamp);
	  
  	  // Next frame
	  requestAnimationFrame(animate);
	}
	
	// Start rAF
	requestAnimationFrame(animate);

One caveat, with a loop like this, `requestAnimationFrame` will always be running and eating up CPU cycles and battery. It's a better practice to only be using it when you actually need to animate something.

### One-off Animations

Unless you're doing large, sequenced animations, you probably just want a quick one-off tween. This is how most people using jQuery's `animate`. I've written a simple function which abstracts the Tween engine, sets up the tween and runs `requestAnimationFrame` for the duration of the animation, then exits.
	
	function oneOffAnimation(from, to, duration, 
							  easing, onUpdate,
							  onComplete) {
	  var t = new TWEEN.Tween(from)
	    .to(to, duration)
	    .easing(easing)
	    .onUpdate(onUpdate)
	    .onComplete(function _onComplete() {
	      t.done = true;
	    });
	
	  var self = this;
	  function tick(ts) {
	    if (!ts) {
	      ts = +(new Date());
	    }
	
	    t.update(ts);
	
	    if (t.done) {
	      onComplete();
	    } else {
	      requestAnimationFrame(tick);
	    }
	  }
	
	  t.start();
	  requestAnimationFrame(tick);
	
	  return t;
	};
	
Which would make the above tween look like:

	var elem = document.getElementById('box');
	oneOffAnimation(
	  { height: 100 },
	  { height: 200 },
	  1000,
	  TWEEN.Easing.Elastic.InOut,
      function _onUpdate() {
        elem.style.height = this.height + 'px';
      },
      function _onComplete() {
        // All done!
      }
    );

### CSS Animations

The only place I would use CSS transitions are for simple, reversable hover effects. Changing the color of links or adding hover states to "clickable" elements. However, given the move to touch-based devices, I'd still do many interaction animations in Javascript which allows touch and gesture detection code to respond with the correct animation. It seems Android and iOS treat `:hover` differently. iOS makes you touch once to activate `:hover` then touch again to activate `click`. Android seems to request holding down to activate `:hover` and a single touch causes `click`. Doing this kind of work in Javascript also keeps things consistent.

### Past Problems, Future Bug Fixes

* In the past, I've seen speed conflicts between CSS animations and `requestAnimationFrame`. For some reason, using both at the same time (I was animating a game and using CSS Animations for UI), caused massive loss of framerate. I'm sure this will be, or alread is, resolved.

* `requestAnimationFrame` is relatively new, oldIE and older versions of Safari don't support it. Using the [standard requestAnimationFrame polyfill](http://paulirish.com/2011/requestanimationframe-for-smart-animating/) will fallback to `setInterval` for scheduling frames. This isn't great for consistent timing. Additionally, older browsers are also likely to have slower Javascript engines so the resulting effect is even further degraded.

* When you run a bunch of Tweens at 60fps, there is a very strong possibility of creating either memory leaks or [Garbage Collector slowdowns](https://www.scirra.com/blog/76/how-to-write-low-garbage-real-time-javascript). Be careful. Brush up on your understanding of Javascript memory management. Use a battle-hardened Tween engine.