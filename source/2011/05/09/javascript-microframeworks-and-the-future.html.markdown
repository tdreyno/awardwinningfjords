--- 
title: "Javascript Microframeworks and The Future"
date: 05/09/2011
---

[jsconf]: http://2011.jsconf.us/
[Thomas Fuchs]: http://mir.aculo.us/
[MicroJS]: http://microjs.com/
[Backbone.js]: http://documentcloud.github.com/backbone/
[Sproutcore]: http://blog.sproutcore.com/
[JavascriptMVC]: http://javascriptmvc.com/
[Cappuccino]: http://cappuccino.org/
[Nick Morgan argues that these types of app are the future]: http://skilldrick.co.uk/2011/05/javascript-and-the-end-of-progressive-enhancement/comment-page-1/
[was similarly flabbergasted]: http://tomdale.net/2011/04/imagine-a-beowulf-cluster-of-javascript-frameworks/
[Ender.js]: http://ender.no.de/
[Dustin Diaz]: http://www.dustindiaz.com/
[Firmin]: http://extralogical.net/projects/firmin/
[batman.js]: http://batmanjs.org/
 
Last week at [jsconf], [Thomas Fuchs] continued his argument for small frameworks with the release of [MicroJS] which acts as a listing of tiny, single-purpose libraries. The idea being that freedom and choice, combined with optimizing for size will result in a better product than using a larger, monolithic "framework."

But what are we talking about when we say "framework" and what kind of applications can be built with microframeworks?  

READMORE

## The Two Types of HTML Applications

It is useful to denominate the two kinds of web applications that exist on the web. First, there is the traditional "Progressive Enhancement" apps. These use Javascript to bring additional interaction, animation and life to static HTML/CSS. The benefit is that even if the client has problems with Javascript due to some esoteric IE bug, or their phone doesn't support Javascript, that they can still interact with the site normally. The majority of large sites using jQuery act in this way. They output HTML from the backend and then jQuery adds interaction.

The second type is the MVC application. These frameworks start from a blank slate and use their own Views (templates) to build up the components of an app. This view layer certainly adds complexity (and lines of code) to the framework, but the result is usually a more Desktop-like user experience. The big frameworks of this type are [Sproutcore], [Cappuccino] and to a lesser degree, [Backbone.js]. [Nick Morgan argues that these types of app are the future].

We'll need to keep in mind both types of applications as we think about optimization. What benefits one might not benefit the other and it's important to figure out the kind of app a person is talking about when they are discussing "microframeworks."

## The Problem

On the web, speed is king. Yahoo and Amazon have shown that every additional millisecond it takes to load your page has a direct result in decreasing sales. Right now, the biggest bottleneck is the way javascript loading blocks rendering in the browser. The modern web craves javascript. The browser is just an empty shell until it is scripted to life. This means the entire stack of web interactivity has to be written in Javascript and it has to be transferred to every single client who views the site. There are 3 solutions to this problem:

### The Great Cache in the Sky

jQuery is now present on about 44% of websites. jQuery also weighs about 130k (before minification and gzipping). Which means after just a little casual browsing, you've probably downloaded jQuery several times. Browsers cache Javascript based on which domain it was downloaded from, which means your browser is actually storing 1 copy of jQuery for every site you visited that used it. And, even though you have a dozen copies already, it's going to download it again when you change to a new site.

The jQuery project and Google both offer to serve jQuery from their respective CDNs. These CDNs are heavily optimized to get clients a copy of jQuery as quickly as possible and they have the added bonus of using a consistent URL. That means if domaina.com and domainb.com both point to Google's copy of jQuery, then they will share the same file in the cache. This means domainb.com and all subsequent domains you visit using the Google CDN copy of jQuery won't have to be delayed waiting for jQuery to download, it will already be in the cache.

This is a great idea. With jQuery on 44% of the web, it's time to admit that it is the "standard library" of the web. Personally, I think Google Chrome should ship with the last dozen versions of jQuery embedded and have an option to prefer the local copies over downloading a new one. The standard library should ship with the language (in the browser). I think this will happen some day, but until then...

### Load Asynchronously

There are a handful of popular new tools for loading your Javascript without blocking such as LABjs, RequireJS, StealJS, yepnope and script.js. Of course, these tools are themselves written in Javascript and must be first loaded in a blocking fashion. However, they are usually small enough that this isn't a real issue. Once the script loader is ready, it will begin pulling in your other Javascript files.

Asynchronous script loading works great for apps using "progressive enhancement", you can off-load almost all the Javascript, including jQuery, until later and when it finally loads the page simply gets a little nicer and interactive. However, to the user it looks like the page is loaded and they can begin interacting immediately.

"MVC Applications" require more complicated organization and packaging to work asynchronously. They need to know which parts of the app can be loaded later and which are needed immediately. The larger frameworks, like [Sproutcore] and [JavascriptMVC], have already solved this problem, but it does add some conceptual overhead.

### Use Less Code

Simply put: send less data to the client. Sounds easy? Remember that jQuery is 130k before you even start writing your own code. This is where Thomas Fuchs (and [MicroJS]) come in. He argues that "frameworks" are too big and include stuff that you probably don't need. He, and others, seem purposefully vague about which framework they are rebelling against, but let's be honest: it's jQuery.

I've built some large applications of both the Progressive Enhancement and MVC varieties and initially I couldn't understand how a seasoned developer could possibly argue that glueing a dozen plugins together is better than a consistent application framework. Tom Dale, of the Sproutcore team, [was similarly flabbergasted]. While I agree with everything Tom writes in that article, I think he got hung up on terminology. Thomas Fuchs isn't arguing against Sproutcore, he is covertly arguing against jQuery. I, Thomas Reynolds (let's call this the Mexican Standoff of Javacript Toms), personally love Sproutcore and so I'll spend the rest of this article talking about replacing jQuery for Progressively Enhanced apps.

## Replacing jQuery Piece by Piece

What is jQuery? Do most developers use everything available? Here are the core functions and their current file sizes:

* Selector Engine (33k)
* DOM Manipulation (21k)
* DOM Attributes (16k)
* DOM Data Storage (9k)
* Core Helpers and Plugin Framework: $.each, $.extend, etc (23k)
* CSS reading/writing/animating (26k)
* AJAX (26k)
* Events (32k)
* Deferreds (5k)

Take a look at that list and then take a look at [MicroJS]. Look familiar? The majority of these micro libraries take aim at a specific portion of jQuery and attempt to do it in a smaller file size. Sound great? If you're optimizing for size it does, but let me issue a word of warning.

jQuery is used on 44% of the web. It is better tested, has more users and has better browser support than any other framework. It is a very well organized project which is continuing to improve and increase performance on every release. I agree with Yehuda Katz, the most important piece of any framework is the size, age and knowledge of its community. Therefore, I believe these new micro libraries will be forced to re-learn the same lessons (whether it be browser support or speed optimization) that jQuery has already solved.

## Enter Ender.js

[Ender.js] is a framework framework. It attempts to provide a scaffold roughly shaped like jQuery with places to plugin micro libraries of your choice to fill in the features. Then Ender.js will glue those parts together and produce either a single output file or a file which loads each component asynchronously.

The default jQuery-like bundle is called "jeesh" and includes:

* Selector Engine (Qwery)
* DOM Manipulation (Bonzo)
* DOM Attributes (Bonzo)
* DOM Data Storage (Bonzo)
* Core Helpers and Plugin Framework: $.each, $.extend, etc (Underscore & Klass)
* CSS reading/writing/animating (Émile)
* AJAX (Reqwest)
* Events (Bean)

These pieces fit together nicely and create an almost drop-in replacement for jQuery. The edges are a little rough and you will have to rewrite some code to use it. [Dustin Diaz] wrote almost all of theses default libraries, so atleast there is some consistency. As Ender.js gets more popular and more libraries are integrated which weren't written by Dustin, I expect the API will get more and more awkward. As I said above, while Dustin is a very smart person (and he's had help from Thomas Fuchs as well), neither can match jQuery's maturity, test suite and institutional knowledge.

Still, if you're optimizing for size on a Progressively Enhanced app, Ender.js is a nice fit. If you're optimizing for consistency and the ability to hire and bring new developers up-to-speed quickly, then you should probably stick with jQuery.  

### Anecdotal "Evidence"

I'm working on a small Progressively Enhanced portfolio site. I've completed the homepage, which uses 2 "plugins" for some slideshows and some helper functions. The initial build was with jQuery and the jQueryUI widget factory. Minified: <u>109k</u>, the majority of that being jQuery which I wasn't really using that many features of.

Next, I ported the site to JavascriptMVC which has a very nice dependency management system and only pulls in the pieces you need (and jQuery). The coding-style was nicer, the code modularized and the minified output was: <u>110k</u>. Makes sense, it has all of jQuery plus a 1k of glue code (Class system + Controllers). I'd really like to see JavascriptMVC (and Sproutcore too), break up jQuery into it's components and rely on those directly. Their dependency management systems can handle this and it should reduce the file system for relatively simple apps.

Finally, I used Ender with Bonzo, Émile, Bean, Qwery and [Firmin]. I had to change some stuff around and basically invent a micro controller system, but the minified output was only: <u>38k</u>.

So, not a surprise, when competing purely on size, microframeworks and Ender.js win. I didn't really love the code I had to write for the Ender.js version and I don't appreciate opening 4 different documentation pages to figure out the methods. Still, I'll probably stick with it because the project has only a single developer, doesn't require great IE compatibility and my primary goal is speed.

## Conclusion
                                        
People are going to keep talking about microframeworks, but I don't see jQuery's usage decreasing at all. Developer Happiness should be the primary goal, but we can't work on that until these technical issues of memory, cpu usage, gpu usage and blocking scripts are solved. They will be solved and looking back, these will feel like the dark ages.

Here's what I'm looking forward to in the "future." I'd like to see an end-to-end framework written in CoffeeScript. Models, Views and Controllers are the same code and the decision whether to execute code on the client or the server can be optimized. Doing the same database requests? Optimize and cache it on the backend. Rendering the same views? Do it on the backend. I'd like to see the client open a connection to the node.js backend and pipeline scripts and data as needed. If something would be faster on the client side, build it into a module and pipe it to the client on demand.

Honestly, I don't think we'll be waiting too much longer for such a system. A first step can be seen in Shopify's [batman.js] which made a huge splash at jsconf. Property binding is huge (also at the heart of Sproutcore) and reduces the need for jQuery's DOM manipulation hammer. Can't wait to play with it!