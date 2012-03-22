--- 
title: PubSub, Evented Programming and Javascript
date: 2010-10-27
---

One of the buzzwords at jQuery Conference 2010 Boston (that mouthful makes Microsoft product names sound elegant), was "PubSub." At least three speakers referenced the concept in different contexts and I overheard quite a bit of chatter about it in the hallways. I was surprised to see so many people getting their first introduction to the concept, especially given how event-oriented jQuery is. So, let's take a look at what PubSub means, how you can use it in jQuery and some very naive example code.

## What is PubSub?

PubSub is short for "Publish and Subscribe." Any piece of code can publish an event, or message, and any other piece of code can listen for that event. This allows code that responds to events to be easily decoupled from the code that creates an event. Here's an example using jQuery's <tt>$.ajax</tt> functionality. Without PubSub you might write an AJAX request like this:

    $.ajax({ 
      url: "/api/login.json", 
      success: function(data) {
        // Update some HTML classes
        // Show the person who logged in
        // Refresh some lists of data
        // etc.
      }
    });

Basically, anything that needs to happen when a user logs in must be written in that nested anonymous "success" function. The best solution for maintaining code, writing test cases and avoiding heavily-nested anonymous functions would be to make a function that handles each step of the login success separately.

## PubSub-enabled AJAX success

For this example, we'll use a very naive version of PubSub. We'll use <tt>$.fn.trigger</tt> and <tt>$.fn.bind</tt> on the root document object. jQuery's event api already handles the nuts and bolts of allowing multiple anonymous functions to respond to a single event, like "click" or "hover." Using this technique, we can organize the AJAX success code like this:

    // Update some HTML classes
    $(document).bind("userDidLogin", function(event, data) {
      $("#loginButton").hide();
      $("#logoutButton").show();
    });
    
    // Show the person who logged in
    $(document).bind("userDidLogin", function(event, data) {
      $("#header #user").html(data.username);
    });
    
    // Refresh some lists of data
    $(document).bind("userDidLogin", function(event, data) {
      $.each(data.items, function() {
        $("#items").append(this);
      });
    });
        
    $.ajax({ 
      url: "/api/login.json", 
      success: function(data) {
        // Publish the event with the data
        $(document).trigger("userDidLogin", data);
      }
    });

Now, it may look like we've created a lot more code, but now each of those subscribing functions can be placed anywhere. Say, for example, that we have a <tt>header.js</tt> which handles changes to the header of the page. We could put only the subscribes that relate to the header in there, thus making our code much more organized. We can also being writing test cases for each of the subscribers now that they are decoupled and simplified.

## PubSub Libraries

There are several available libraries for handling PubSub in javascript. The simplest jQuery form is what I've used here. [This article on the Bocoup blog] compares the speed of the approach I've used above with a dedicated jq.pubsup library. Not surprisingly, anything dealing with the DOM is going to be slower than handling the events in memory.

I personally use the [OpenAjax Hub implementation] in conjunction with the [JavascriptMVC Controller].

[This article on the Bocoup blog]: http://weblog.bocoup.com/publishsubscribe-with-jquery-custom-events
[OpenAjax Hub implementation]: http://www.openajax.org/member/wiki/OpenAjax_Hub_1.0_Specification
[JavascriptMVC Controller]: http://v3.javascriptmvc.com/index.html#&who=jQuery.Controller
