---
title: ! 'Client-side MVC+S Part 1: The Model and Data Store'
date: 2011-01-25
blog_editor_id: 48
---

Like it or not, the Apple iPhone and iPad have changed people&rsquo;s expectations for how apps and even websites should behave. As designers begin porting native application concepts to the web, we front-end developers have got to become more organized and application-oriented to survive. More and more, websites should be categorized as "simple applications." Building sites as a collection of jQuery plugins is a bad idea in this new, complex web-application world.

Maybe you&rsquo;ve heard about [Sproutcore], [Capuccino], [Sencha Touch],  [JavascriptMVC] or [Backbone]. These frameworks provide a full application stack for the web and they are all based on the Model-View-Controller pattern. Please note, if you are familiar with server-side MVC, you should be aware that client-side MVC is slightly different. Even if you aren&rsquo;t interested in learning a whole new framework, you will definitely need the MVC pattern to build modern web sites so I&rsquo;m going to talk about what each piece of the pattern looks like on the client-side.

## Model

Client-side models have two important pieces. First is the traditional model which has some attributes (like name, date updated, etc) and allows you to update those attributes. The generic Javascript object handles this role perfectly. If you&rsquo;re getting data from JSON, you&rsquo;re getting a JavaScript Object Model (JSOM?) of the data. For example:

    { name: "Object 1", updated_at: "2011/01/25" }
    
At some point you will want to have some helper functions that are related to each model. Maybe you want to get the name in all caps. A simple Javascript Class for this model would look like:

    var Project = function(attrs) {
      this.name = attrs.name;
    }
    
    Project.prototype.allCapsName = function() {
      return this.name.toUpperCase();
    }
    
    var myProject = new Project("mine");
    myProject.allCapsName() => "MINE"
    
So far, so good and we&rsquo;re still entirely in the realm of plain old Javascript. Each of the popular frameworks mentioned above take the approach of wrapping a data object in a class to allow custom methods, but if all you need is a way of organizing your code without a library, this should be good enough.

## Data Store

The second part of the Model is the Data Store/Source. At some point, you will need a way of getting models from a server, working with a list of models and sending updates to the server. If you have each model handle communication with the server itself, you will end up with a lot of duplication. So let&rsquo;s make a data store that gets a list of project using a plain javascript model from above. I&rsquo;m going to use jQuery for the AJAX portion because 

    var ProjectList = {
      all: [],
      fetch: function(myCallback) {
        var self = this;
        $.get("/projects.json", function(data) {
          for (var i = 0; i < data.length; i++) {
            var model = new Project(data[i]);
            self.all.push(model);
          }
          myCallback && myCallback(self.all);
        });
      }
    };

    ProjectList.all => []
    ProjectList.fetch(function(data) { 
      console.debug("Got a list of Project models");
    });

Basically, we have a Javascript object which stores a list of our models. When we call <tt>ProjectList.fetch</tt>, jQuery gets JSON representing a bunch of projects which we iterate over and add to <tt>ProjectList.all</tt> which is an array. If you wanted, you could also write some kind of <tt>ProjectList.sync</tt> function which would push data to the backend.

[Sproutcore] and [Sencha Touch] provide robust data source libraries for interacting with a wide variety of backends such as REST, XML, JSON or YQL. Their model systems also track which attributes have changed on each object and can intelligently sync with the backend. Still, even without using a framework, this abstraction is very useful.

Ed Spencer has [a great write-up of the Sencha/ExtJS Data Package]. I highly suggest reading it if only to get a grasp on the importance of having solid client-side models.

[Sproutcore]: http://www.sproutcore.com/
[Capuccino]: http://cappuccino.org/
[Sencha Touch]: http://www.sencha.com/products/touch/
[JavascriptMVC]: http://javascriptmvc.com/
[Backbone]: http://documentcloud.github.com/backbone/
[a great write-up of the Sencha/ExtJS Data Package]: http://www.sencha.com/blog/2011/01/21/countdown-to-ext-js-4-data-package/
