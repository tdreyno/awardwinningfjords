---
title: "Front-end Performance Tools: Canvas Matrix"

---

[Sylvester]: http://sylvester.jcoglan.com
[Closure Mat3]: http://code.google.com/p/closure-library/source/browse/trunk/closure/goog/vec/mat3.js?r=1175
[gl-matrix]: https://github.com/toji/gl-matrix
[canvas-mat3]: https://github.com/tdreyno/canvas-mat3/blob/master/mat3.js.coffee
[View the full library on Github]: https://github.com/tdreyno/canvas-mat3
[Embedded Vector]: /2012/05/19/embedded-vector.html

I really don't want to be the one to write an article about Matrices and how useful they are, so here is the short version. 

A matrix is a way of representing the position (translation), rotation and scale of a point (Vector). What's better, both CSS and HTML5 Canvas can accept matrix values.

There are plenty of great Matrix implementations in Javascript, such as:

* [Sylvester] - includes a Vector class too
* [Closure Mat3] - very Google-y API
* [gl-matrix] - Optimized for WebGL and 3d

These libraries are great, but I wanted something small and simple. I've written [canvas-mat3], a short, 57 line Matrix in CoffeeScript which only tracks translation, rotation & scale and which includes support for sending this data to HTML5 Canvas.

[View the full library on Github].

## Usage

    function CanvasImage(src) {
      this.src = src;
      this.mat3 = new Mat3();
    }
    
    CanvasImage.prototype.draw = function(ctx) {
      ctx.save();
      this.mat3.applyToContext(ctx);
      ctx.drawImage(this.src, 0, 0);
      ctx.restore();
    };
    
    var myImage = new CanvasImage(document.getElementById("img"));
    myImage.mat3.translate(100, 100); // Move to 100x100
    
    // Rotate 90 degrees, around point 100x100
    myImage.mat3.rotate(90 * RAD_TO_DEGREE, 100, 100);
    
    // Scale X, Flip Y, around point 100x100x
    myImage.mat3.scale(2.0, -1.0, 100, 100);
    
    var canvas = document.getElementById("canvas");
    var ctx    = canvas.getContext2d();
    
    myImage.draw(ctx);

### Embedded?

Like the [Embedded Vector] class, it might make sense to store and manipulate matrix values directly on an object, instead of having one Mat3 instance per object. If there is interest, I may adapt this code to providing a mixing as well.