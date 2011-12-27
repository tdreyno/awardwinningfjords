---
title: Ember.js Live Collections
date: 12/27/2011
---

If you're writing a client-side application, there are two common tasks you can expect to perform. First, modern web applications are expected to show updated information as quickly as possible without a full page reload. (Think about Twitter or Facebook: as you're reading the updates, newer updates continue to arrive at the top of the page.) Second, you'll be sending the current user's updates to everyone else's streams.

You can probably imagine how often you'll need to implement these patterns: mail clients, chat rooms; anything that updates, really.

Over the weekend, my friends at Bocoup [posted an article] called *Backbone.js Live Collections* which discussed how to use Backbone.js<sup>1</sup> to poll Twitter for new tweets and update a list of those tweets on the page. <strike>I don't know their official stance on Backbone.js, so I'm going to assume they used it as an example because it was either code extracted from one of their projects or they simply decided to use Backbone.js because of its popularity.</strike> __[Edit: Ben Alman of Bocoup has clarified their position saying: "FWIW, we decided to use Backbone after a ton of research and experimentation."]__ Go ahead and read that article… I'll wait.

Back? Good.

Assuming that Bocoup simply chose Backbone.js for familiarity's sake, I glibly summed up the article as "In other words, use Ember.js :-p" and ruffled more feathers than I intended. I was invited to write this article to express my point better than a tweet could, so here we go.

## Ember.js <strike>Amber.js</strike> <strike>Sproutcore 2.0</strike>

[Ember.js] is what happened when SproutCore decided to be less Apple Cocoa and more jQuery. The result is a web framework which retains very important high-level concepts such as observers, bindings and state charts, while delivering a concise API. SproutCore started its life as the development framework behind an early client-side email application. Then, Apple used it to build MobileMe (and then iCloud), both of which include email clients. Needless to say, they've figured out that collections which update from the server are very important. In my opinion, SproutCore/Ember.js are the best solution for anything needing collections of data rendered into the DOM. Thus my glib tweet above.

Below, I've recreated the Bocoup example using Ember.js. I think it expresses the intent of the initial application more concisely and
understandably. You'll note that there is no code that interacts with the DOM at all; instead, making in changes in JavaScript causes
the DOM to be updated to reflect the new state automatically.

### App

    :::javascript
    // Setup a global namespace for our code.
    Twitter = Em.Application.create({

      // When everything is loaded.
      ready: function() {

        // Start polling Twitter
        setInterval(function() {
          Twitter.searchResults.refresh();
        }, 2000);

        // The default search is empty, let's find some cats.
        Twitter.searchResults.set("query", "cats");
        
        // Call the superclass's `ready` method.
        this._super();
      }
    });

The app is the core of any Ember.js project. It provides a ready event, much like jQuery's, and sets up event delegation behind the scenes. Its primary use in this example is to namespace all our classes and variables under the `Twitter` namespace.

### Template View

    :::html
    <script type="text/x-handlebars">
      <ul class="tweets">
      {{#each Twitter.searchResults}}
        <li class="tweet">{{text}}</li>
      {{/each}}
      </ul>
    </script>

Ember.js templates are written in [Handlebars.js]. You can use a `text/x-handlebars` script tag anywhere in your document and it will be replaced with a live-updating View. The above code will watch for a variable called `Twitter.searchResults` and when it changes, it will update the list items in the `ul`. See what I mean about Ember.js being optimized for collections and lists?

### Model

    :::javascript
    Twitter.Tweet = Em.Object.extend();

This is entirely a naming/convenience issue. We're not writing any custom code for handling each tweet. We simply take its JSON and use it directly.

### Controller

    :::javascript
    // An instance of ArrayController which handles collections.
    Twitter.searchResults = Em.ArrayController.create({

      // Default collection is an empty array.
      content: [],

      // Default query is blank.
      query: null,

      // Simple id-to-model mapping for searches and duplicate checks.
      _idCache: {},

      // Add a Twitter.Tweet instance to this collection.
      // Most of the work is in the built-in `pushObject` method,
      // but this is where we add our simple duplicate checking.
      addTweet: function(tweet) {
        // The `id` from Twitter's JSON
        var id = tweet.get("id");

        // If we don't already have an object with this id, add it.
        if (typeof this._idCache[id] === "undefined") {
          this.pushObject(tweet);
          this._idCache[id] = tweet.id;
        }
      },

      // Public method to fetch more data. Get's called in the loop
      // above as well as whenever the `query` variable changes (via
      // an observer).
      refresh: function() {
        var query = this.get("query");

        // Only fetch if we have a query set.
        if (Em.empty(query)) {
          this.set("content", []);
          return;
        }
        
        // Poll Twitter
        var self = this;
        var url = "http://search.twitter.com/search.json?q=" + query + "&callback=?";
        $.getJSON(url, function(data) {

          // Make a model for each result and add it to the collection.
          for (var i = 0; i < data.results.length; i++) {
            self.addTweet(Twitter.Tweet.create(data.results[i]));
          }
        });
      }.observes("query")
    });

Here's the meat of the solution. Most of this is simply setting up a nice API and doing the JSON request. The simplest version of the code above would look like:

    :::javascript
    Twitter.searchResults = Em.ArrayController.create();
    $.getJSON("http://search.twitter.com/search.json?q=cats&callback=?", function(d) {
       Twitter.searchResults.pushObjects(d.results);
    });

## Step 3, Profit

There is no step three!

[Check out the demo]

I'm not saying Ember.js is the best solution for every problem, but when it comes to collections updating the DOM, they've nailed it.

### Footnotes

1. Backbone.js is a client-side Model-View-Controller framework for Javascript. It is incredibly popular. The [PeepCode screencasts] are a wonderful way to get started.

2. Thanks to [Tom Dale] of the Tilde, and a developer on the Ember.js project, for proofing this article.

[posted an article]: http://weblog.bocoup.com/backbone-live-collections
[PeepCode screencasts]: http://peepcode.com/products/backbone-js
[Handlebars.js]: http://www.handlebarsjs.com/
[Check out the demo]: /projects/emberjs-live-collection.html
[Tom Dale]: https://twitter.com/#!/tomdale
[Ember.js]: http://www.emberjs.com/