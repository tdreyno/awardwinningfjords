---
title: Ember.js Live Collections
date: 12/27/2011
---

If you're writing a client-side application, then you can expect to be down two different operations very frequently. First, modern web applications are expected to show updated information as quickly as possible without a full page reload. Think about Twitter or Facebook, as you're reading the updates, newer updates continue to arrive at the top of the page. Second, you'll be needing to add you personal updates to everyone else's streams. Pull and Push.

Now that you know how important the concept is, and you can probably imagine how often you'll need to be writing such a thing (Mail clients, chat rooms, anything that updates really), let's get to the purpose of this article.

Over the weekend, my friends at Bocoup [posted an article] called *Backbone.js Live Collections* which discussed how to use Backbone.js<sup>1</sup> to poll Twitter for new tweets and update a list of those tweets on the page. I don't know their official stance of Backbone.js, so I'm going to assume they used it as an example because it was either code extracted from one of their projects or they simply decided to use Backbone.js because of it's popularity. Go ahead and read that article… I'll wait.

Back? Good.

Assuming that Bocoup simply chose Backbone.js for familiarity sake, I glibly summed up the article as "In other words, use Ember.js :-p" and ruffled more feathers than I intended. I was invited to write this article or express my point better than a tweet ever could. So here we go.

## Ember.js <strike>Amber.js</strike> <strike>Sproutcore 2.0</strike>

Ember.js is what happened when SproutCore decided to be less Apple Cocoa and more jQuery. The result is a web framework which retains very import high-level concepts such as observers, bindings and state charts, while delivering a concise API. Sproutcore started its life as the development framework behind an early client-side email application. Then, later, Apple used it on MobileMe (and then iCloud) which both include email clients. Needless to say, they've figured out how important collections which update from the server are. In my opinion, Sproutcore/Ember.js are the best solution for anything needing collections of data rendered into the DOM. Thus my glib tweet above.

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

The app is the core of any Ember.js project. It provides a ready event, much like jQuery's, and does fancy event handling behind the scenes. Its primary use in this example is to namespace all our classes and variables under the `Twitter` namespace.

### Template View

    :::html
    <script type="text/x-handlebars">
      <ul class="tweets">
      {{#each Twitter.searchResults}}
        <li class="tweet">{{text}}</li>
      {{/each}}
      </ul>
    </script>

Ember.js templates are written [Handlebars.js]. You can use a `text/x-handlebars` script tag anywhere in your document and it will be replaced with a live-updating View. The above code will watch for a variable called `Twitter.searchResults` and when it changes, it will update the list items in the `ul`. See what I mean about Ember.js optimizing for collections and lists?

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

[posted an article]: http://weblog.bocoup.com/backbone-live-collections
[PeepCode screencasts]: http://peepcode.com/products/backbone-js
[Handlebars.js]: http://www.handlebarsjs.com/
[Check out the demo]: /projects/emberjs-live-collection.html