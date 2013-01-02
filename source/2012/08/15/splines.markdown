---
title: Reticulating Splines
blog_editor_id: 11
---

The Javascript community is at a huge disadvantage. For some reason, the experience, code and community of Flash developers never quite transferred over. Maybe living in an Adobe ecosystem stifled their open source contributions, maybe we were too new to understand or maybe we just don't travel in the same circles.

Regardless of the reason, HTML5 animators are mostly having to reinvent the wheel. The new cornerstones of our work, projects like [Paper.js](http://paperjs.org/), [Three.js](http://mrdoob.github.com/three.js/) and [Tween.js](https://github.com/sole/tween.js/), are written by former Flash developers and often assume familiarity with their techniques. That's why, today I had to learn something new.

Today, I was snooping around the code of [The Story of Send](http://www.google.com/green/storyofsend/desktop/), a fantastic, animated HTML5 experience by B-Reel for Google. I found some interesting techniques:

* [Swiffy](https://www.google.com/doubleclick/studio/swiffy/) to convert from Flash to SVG animations.
* Strange overflow and visibility hacks to manipulate the scroll bar
* The requirement of the entirety of Three.js for a single class: [THREE.Spline](https://github.com/mrdoob/three.js/blob/master/src/core/Spline.js)

That last item piqued my interest. Obviously, these guys know their business and are quite comfortable with animation. What the hell is a Spline?

Googling did me no good. All I got were Wikipedia articles about math and 3d-rendering software forums. Digging back into the obfuscated Story of Send code revealed their purpose: Splines used x/y coordinates for individual points that the camera stopped along the animation.

Their use became apparent:

    Given that we want to Tween between specific points, Splines let us
    calculate smooth transitions.

A naive HTML5 animator, given the same problem, might simply animate linearly, in a straight line, from point A to point B. Then, his former Flash-developing boss would smack him on the head for the resulting animation being too rigid and boring. Here's an example (it's interactive, grab the points to explore):

<iframe src="/projects/spline/linear.html" width="601" height="410" style="overflow: hidden"></iframe>

<br>
Now, let's run our points through [THREE.Spline](https://github.com/mrdoob/three.js/blob/master/src/core/Spline.js) and see what the line looks like (this one's interactive too):

<iframe src="/projects/spline/index.html" width="601" height="410" style="overflow: hidden"></iframe>

Very good! As you can see, the pace of the line is now smoothed around the points. When we use this as the path for our Tween, we will have a fun, and natural "roller-coaster" feeling.

### Caveat

I figured this out entirely through code inspection and reading un-documented libraries. I may WAAAAAAY off-base. If you know better, shoot me an email.