---
title: "How Do I: Structure Applications"

---

This is part two in a series of "How Do I" articles ([part one, Animation, is here](/2012/10/01/how-do-i-animate.html)). These are how I, Thomas Reynolds, accompish certain tasks. This isn't about comparing multiple technique or even justifying my prefered approach. This is a brain dump.

### Structure Philosophy

These days, I think the difference between a "Site" and an "Application" is very small. Sites may start small, be less interactive and have less state than Applications, so they don't necessarily need tools and libraries to handle those advanced issues. But it certainly doesn't hurt.

Site or Application, I try to start with the same tools and structure.

### Build System & Dependency Management

These two systems are often bundled together. I use [Middleman](http://middlemanapp.com), which is perfect for my needs because I wrote it. For the Ruby-adverse, or Javascript-masochists, [Yeoman](http://yeoman.io) is gaining traction.

Modern applications include many libraries and, of course, developers should be modularizing their code into many, independent files as well. You *could* simply include a bunch of `script` tags in your HTML and make sure they stay in the right order, but that's immature and doesn't scale. Instead, the modules need to define what their dependencies are and let some other system make sure they load in the correct order.

Middleman includes [Sprockets](https://github.com/sstephenson/sprockets) and [Rake-Pipeline](https://github.com/livingsocial/rake-pipeline). I flip flop on which one I use and I'm not really happy with either of them. That said, they do their job and get out of the way.

The Build step is very important. It takes your code, libraries and file layout&mdash;which are optimized for your development process and speed&mdash;and converts them into fewer, smaller files optimized for bandwidth and load time.

Middleman makes this step simple. In my config, I add:

	configure :build do
		activate :minify_css
		activate :minify_js
	end

And we're done. In more complicated projects, this step can also compress images, generate pre-gzipped assets and automatically run tests.

Regarding Javascript compilation and minification, Middleman defaults to [UglifyJS](https://github.com/mishoo/UglifyJS), which is pretty much the standard for open source Javascript libraries (such as jQuery, HTML5Boilerplate, etc). I still prefer [Google's Closure Compiler](https://developers.google.com/closure/compiler/), which has long been the best for file size, at the cost of developer happiness and the annoyances of working with a large Java tool. However, these days, Javascript file size is dwarfed my image assets so that's less important and UglifyJS is rapidly approaching Closure's efficiency.

### Core Libraries

* DOM Wrapper ([Closure](https://developers.google.com/closure/library/) or jQuery)
* Browser Feature Detection ([Modernizr](http://modernizr.com))
* Animation Framework ([tween.js](https://github.com/sole/tween.js/)) 
* CSS Transform 2d/3d Support ([TransformJS](https://github.com/sproutcore/TransformJS))
* Statechart ([Stativus](https://github.com/etgryphon/stativus) or [Ember.js](http://emberjs.com))
* View Layer (Ember.js or something custom)
* URL Router (Ember.js or [Sherpa](https://github.com/joshbuddy/sherpa))
* Templating Library ([Soy](https://developers.google.com/closure/templates/) or [Handlebars](http://handlebarsjs.com))
* Asset Loader ([PxLoader](http://thinkpixellab.com/pxloader/))

#### DOM Wrapper

Paves over cross-browser issues with the most basic interactions with the browser. A no-brainer. I use Closure or jQuery, depending on what the client wants, but I prefer jQuery. That said, I don't use jQuery for animation or code structure (`$.fn.plugins`).

#### Browser Feature Detection

[Modernizr](http://modernizr.com) detects available features and makes it easy to fallback to lesser technologies through either a Javascript or CSS interface. It also provides an HTML5 shim for older browsers. Here's a quick example:

	// JS
	if (Modernizr.touch) { $(elem).on('touchstart', handler); }

Or

	/* CSS */
	.svg { background-image: url(bg.svg); }
	.no-svg { background-image: url(bg.png); }

Another no-brainer, this should be on every site on the web.

#### Animation Framework

As [I said before](/2012/10/01/how-do-i-animate.html), I use a Tween library to get the animation effects I want. jQuery doesn't use `requestAnimationFrame`, so I have to use something third-party. [tween.js](https://github.com/sole/tween.js/) is great. See the previous article for examples.


#### CSS Transform 2d/3d Support

If you want to animate rotation and scale, you're going to need CSS Transforms. Using these transforms also has the side-effect of moving their rendering to the GPU, so replacing animations of position `top` and `left` can be faster if transforming `translateY` and `translateX` are used instead. [TransformJS](https://github.com/sproutcore/TransformJS) is a polyfill that uses the best available technique. 3d transforms for those which support it, falling back to 2d transforms and finally top/left positioning. The API looks like:

	$(elem).css({ transformX: 100, scale: 2 });

#### Statechart

I love Statecharts. Every single project should have them. They simplify events and messaging, give you a central place for "controller" code and never leave you between states. They also pair wonderfully with a Router (see below). Ember.js has a fantastic implementation, if that's not available, the [Stativus](https://github.com/etgryphon/stativus) project is basically the same code abstracted to be library agnostic.

One of these days, I'm going to be able to write about Statecharts well. Until then, [try this article](http://www.itsgotwhatplantscrave.com/2009/02/22/building-sproutcore-apps-with-statecharts-part-2/).

#### View Layer

Like the Statechart, the View Layer is all about centralizing code related. A view handles what content should be in a HTML area, how to show it, how to hide it and how to handle events in that area. Without a View Layer, you'll end up with jQuery-itis, spaghetti code which all different parts of your codebase are updating the same DOM elements. This provides a nice simple API to your controllers and Statecharts:

	toottipView.refresh();
	tooltipView.show();
	$(document).one('click', function() { tooltipView.hide(); });

Ember.js has my favorite implementation due to its ability to bind and auto-update elements. Backbone has a less magical, but still very-solid version.

#### URL Router

Applications should be deep-linkable when possible and since many Sites are becoming "single page" site which load other pages dynamically, they both need some mechanism for responding to URL changes on the client-side. Ember.js comes with a great router, if that's not available, I use [Sherpa](https://github.com/joshbuddy/sherpa) which works in both the browser and on NodeJS. It's got a nice API:

	var sherpa = new Sherpa.Router();
	sherpa.add('/test/:variable').to('testing');
	sherpa.recognize('/test/hello'); /*=> {
	  "destination": "testing",
	  "params": {
	    "variable": "hello"
	  }
	}*/

#### Templating Library

String concatination is not okay. It's ugly, hard to update, littered with double quotes, single quotes, escape characters, whitespace and plus signs. [Handlebars](http://handlebarsjs.com) is a wonderfully powerful implementation of Mustache templates. Nice clean HTML:
	
	<div class="entry">
	  <h1>{{title}}</h1>
	  <div class="body">
	    {{body}}
	  </div>
	</div>

If the project relies on Google Closure, then their Soy templates are the only option.

#### Asset Loader

You *could* just include normal `img` tags and CSS `background-images`, especially if the site was very traditional. But with an Application that has user data or many sections, it is probably a better idea to only load what you need. Multipage Sites would also benefit from waiting to load images on subsequent pages until the visitor actually requests them. Having a place to centralize all this loading (and queueing and prioritizing) is really useful. I use [PxLoader](http://thinkpixellab.com/pxloader/), which came out of the HTML5 version of Cut the Rope. I still use `img` tags and CSS for items which are always visible, but the Asset Loader can provide niceties like loading percentage bars and a central place for optimization.

### Conclusion

You might be saying, "that's quite a bit of stuff!" The nice thing about having a consistent stack is that it can be refined and improved from project to project. You don't have to be constantly writing some half-broken, untested implementation of a single piece of the stack. Just suck it up and let your dependency management and compiler deal with optimizing out the pieces you aren't using. We've got 500kb Retina images on these sites, don't let worrying about 5kb of Javascript make your development more difficult than it needs to be.