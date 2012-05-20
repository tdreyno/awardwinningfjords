---
title: "Front-end Performance Tools: Embedded Vector"

---

[How to write low garbage real-time Javascript]: http://www.scirra.com/blog/76/how-to-write-low-garbage-real-time-javascript
[You can view the library, embedded-vector, here]: https://github.com/tdreyno/embeded-vector

Recently, I've been working on quite a few animation projects in Javascript. Traditional web applications are evented. The browser and application wait or user (or network) input and adjust the displayed content accordingly. Animation is different. Animation needs to run 60 frames-per-second, every second that the viewer is on the page. This create two problems.

One, every piece of code in your runloop is being executed repeatedly. Small errors and inefficiencies quickly pile up, leak memory, trigger garbage collection and slow down execution.

And two, since the browser uses the same thread for animation, execution and garbage collection, errors and inefficiencies will negatively effect the smoothness of the animation. An animation is only as good as its framerate.

Here are a collection of tools I've been working on avoid common performance problems.

## Avoid Creating Unnecessary Objects

See my previous article about avoiding the creation of unnecessary, intermediate objects when using CoffeeScript. The principle applies in regular Javascript as well.

A common source of unnecessary objects in animation is the simple Vector class which models an element's x and y position. Paper.js' Point class is a good example. Basically, elements in the system have a Vector position which can be manipulated, rotated, scaled, et cetera. However, doing this kind of math creates object on every frame which will quickly pile up. Ashley Gullen's article, [How to write low garbage real-time Javascript], covers the issue in depth.

The solution is simply to add x and y parameters directly to your elements, avoiding the intermediate Vector class. To facilitate this, I've extracted a small library from some code I've been writing which let's you mixin x/y values to existing classes, and have access to basic Vector math operations.

[You can view the library, embedded-vector, here].

Here's an example:

    // Particle constructor
    function Particle() {}
    
    Vector.mixinTo(Particle);

    var p1 = new Particle();
    
    p1.getX(); // 0
    p1.getY(); // 0
    
    var p2 = new Particle();
    p2.set(10, 10)
    p2.getX(); // 10
    p2.get(); // 10
    
    p1.distance(p2); // 14.1421356

You can also namespace the methods, so you have have multiple x/y pairs.

    // Ball constructor
    function Ball() {}
    
    Vector.mixinTo(Particle, "position");
    Vector.mixinTo(Particle, "velocity");
    
    var b = new Ball();
    
    b.getPositionX(); // 0
    b.getPositionY(); // 0
    b.getVelocityX(); // 0
    b.getVelocityY(); // 0
        
    function onFrame(delta) {
      // Fake gravity
      b.addVelocity(0, -9.8 * delta)
      b.addPosition(
        b.getVelocityX() * delta
        b.getVelocityY() * delta
      );
    }