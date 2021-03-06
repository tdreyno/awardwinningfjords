---
title: HTML5 localStorage for JavascriptMVC
date: 2010-05-21
blog_editor_id: 64
---

[John Resig's blog post]: http://ejohn.org/blog/javascript-micro-templating/
[OpenAjax]: http://www.openajax.org/index.php
[Checkout the Github repository]: http://github.com/secondstory/secondstoryjs-html5storage
[Yahuda Katz' jquery-offline]: http://github.com/wycats/jquery-offline
[current version of JavascriptMVC 3 from their site]: http://v3.javascriptmvc.com/index.html
[JavascriptMVC Getting Started Guide]: http://v3.javascriptmvc.com/index.html#&who=getstarted
[blog post on JavascriptMVC's impressed unit/functional testing system]: http://jupiterjs.com/pages/javascriptmvc#news/too-enterprisey

**[Updated]: The new Github repository location is: http://github.com/secondstory/secondstoryjs-html5storage. The new class names are SS.Model.HTML5Store.Local and SS.Model.HTML5Store.Session**

For those who don't know, JavascriptMVC 3 is a framework for building complex web applications based on jQuery. jQuery is a wonderful tool for manipulating the DOM, but it doesn't provide any system for dependency resolution, file organization or a separation of concerns. JavascriptMVC 3, which is currently in a very solid alpha form, provides a strong MVC foundation for oragnizing your code.

The View component supports Ejs (a javascript variant of Erb), Jaml (a javascript templating system inspired by Haml) and a basic template implementation based on [John Resig's blog post] called Micro.

The Controller layer is based on responding to events, both normal jQuery DOM events (and special events) as well as OpenAjax events.

Finally, the Model component is basically just a Class which you can wire into your existing REST API with the help of some plugins and a little code. The Model component comes with a backing data store that can be swapped out. The default is an in-memory object that's provided as a placeholder for future data stores.

I suggest reading this [blog post on JavascriptMVC's impressed unit/functional testing system].

HTML5 is the new hotness and so I've implemented <tt>localStorage</tt> and <tt>sessionStorage</tt> backends for the JavascriptMVC 3 Model system. This means that once data is loaded into your model (via Ajax) it can be cached on the local machine until the end of the session or "forever" (until the localStorage cache is cleared). The difference between <tt>sessionStorage</tt> and browser cookies is that cookies are sent on every request so they are not well suited for storing lots of data. 

How Do I Use It?
----------------

First, get the [current version of JavascriptMVC 3 from their site].

Second, grab the code using JavascriptMVC's built-in <tt>getjs</tt> command:

    ./steal/js steal/getjs ss/model/html5store

Next, create a Site and a Model (see the [JavascriptMVC Getting Started Guide]).

We need to add our new plugin to the site. In appname.js, add the following to your <tt>steal</tt> command:

    .plugins("ss/model/html5store")

Okay, so we have a model and now we need to add the new store system:

    jQuery.Model.extend("MyModel",
    {
      setup: function(){
        // Alternatively, use SS.Model.HTML5Store.Local
        this.storeType = SS.Model.HTML5Store.Session; 
        this._super.apply(this, arguments);
      }
    },
    {
    }
    );

Now, whenever you create a MyModel with a unique id, it will be added to the HTML5 sessionStorage. You're responsible for updating the store if the model changes and for querying the store to see if it has a copy of the model we're looking for. Here's some boilerplate code to do that:

    function updateModel(params) {
      MyModel.store.destroy(params.id);
      MyModel.store.create(params);
    }
    
    function isInStore(id) {
      return MyModel.store.findOne(id);
    }

Using this plugin, I've been able to decrease the number of Ajax requests in my data-heavy webapp to 0 after the initial load. You could also preload data in the background using this technique to vastly improve the speed of your site.

Browser Support
---------------

HTML5 localStorage is supported in IE8, Firefox 3.5+, Safari 4+, Chrome 4+ and Opera 10.50+. If localStorage is unavailable, the plugin will degrade to the default in-memory store.

jQuery-offline
--------------

For a framework-agnostic version of this plugin, please take a look at [Yahuda Katz' jquery-offline].
