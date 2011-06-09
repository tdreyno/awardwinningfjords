--- 
title: JavascriptMVC Router
date: 23/07/2010
---

[Joshua Hull's wonderful Sherpa route recognizer]: http://github.com/joshbuddy/sherpa
[a copy of the Sherpa library]: http://github.com/joshbuddy/sherpa/raw/master/lib/sherpa.js
[grab the code from GitHub as a download]: http://github.com/secondstory/secondstoryjs-router/zipball/master
[Secondstory]: http://secondstory.com/

**[Edit]: The SecondStoryJS Router now has a documentation website at <a href="http://secondstory.github.com/secondstoryjs-router/">http://secondstory.github.com/secondstoryjs-router/</a>**

Modern web applications should function as naturally as their static page-based predecessors. As developers, we may need to store state in the location bar, but the user shouldn't be able to tell the difference, except, hopefully, the Ajaxified version should be faster and smoother.

To accomplish this, we need to move a lot of the libraries we've used on the backend into the world of Javascript. JavascriptMVC handles models, views and controllers, but it doesn't provide a router. A router takes a string which contains state, such as <tt>/articles/my-first-article</tt> and activates a specific piece of code which can respond to the request.

At [Secondstory], we've been building upon JavascriptMVC and [Joshua Hull's wonderful Sherpa route recognizer]. Originally intended for usage in a NodeJS environment, Sherpa can take complex route definitions (as seen in Ruby on Rails) and map them to a destination while extracting variables from the route.

Here's a matching example from the Sherpa docs:

    :::JavaScript
    Router.add('/test/:variable').to('testing')
    Router.recognize('/test/iloveyou') ->
      {
        "destination": "testing",
        "params": {
          "variable": "iloveyou"
        }
      }

You can also generate routes from parameters if you give the route a name:

    :::JavaScript
    Router.add('/test/:variable').to('testing').name('testRoute')
    Router.generate('testRoute', { "variable": "iloveyou" }) ->
      "/test/iloveyou"


Using in JavascriptMVC
----------------------

First, grab a copy of the Sherpa library and put it in your resources directory. Then, in your JavascriptMVC project file you intialize Sherpa:

    :::JavaScript
    steal.resources("sherpa")
         .then(function($) {

      var Router = new Sherpa.Router();
    });

Now you have to choose how tightly you want to couple routes and controllers. I've approached this in a two different ways.

First, you can initialize a new controller on the document element when the route is matched:

    :::JavaScript
    Router.add("/articles/:article_name").to("project_article");
    
    var key        = window.location.pathname,
        foundRoute = Router.recognize(key);
        
    if (foundRoute && $(document)[foundRoute.destination]) {
      $(document)[foundRoute.destination](foundRoute.params);
    }

Alternatively, you could fire an OpenAjax event instead:

    :::JavaScript
    Router.add("/articles/:article_name").to("project_article");
    
    var key        = window.location.pathname,
        foundRoute = Router.recognize(key);
        
    if (foundRoute) {
      OpenAjax.hub.publish(foundRoute.destination, foundRoute.params);
    }

Unfortunately, this will only run once, during the inital load of your project. In reality, you will want to watch the location bar throughout the usage of your application and either run controllers or publish events for each location change. JavascriptMVC provides the <tt>jquery/controller/history</tt> which publishes <tt>history./current/url</tt> OpenAjax events when the location changes. You could wire this up on your own, or you could use the class we've developed and written tests for.

SS.Router
---------

The Secondstory router class uses <tt>jquery/controller/history</tt> to listen to the location change events, then it matches against the Routes you have setup and finally sends a new OpenAjax event containing the value of the <tt>.to()</tt> method you setup when definition the route. It also contains logic for making sure multiple events aren't published for the same location if a user clicks the same link twice, for example.

First, grab the code using JavascriptMVC's built-in <tt>getjs</tt> command:

    ./steal/js steal/getjs ss/router
    
So let's go back to our project configuration file:

    :::JavaScript
    steal.plugins("ss/router")
         .then(function($) {

      Router.add("/articles/:article_name").to("project_article");
    });
    
That's it! When <tt>#/articles/my-first-article</tt> is accessed, OpenAjax will publish a <tt>project_article</tt> event with "my-first-article" as the "article_name" parameter.
