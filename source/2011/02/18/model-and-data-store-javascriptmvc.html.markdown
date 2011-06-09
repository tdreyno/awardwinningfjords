--- 
title: "Model and Data Store: JavascriptMVC"
date: 18/02/2011
---

Last time, [I wrote about client-side models] in an abstract way using plain Javascript. Understanding the purpose of models and encapulating model-specific functionality is important for code organization, but you will end up having to write a bunch of code to support your models. For example, converting and parsing JSON values, figuring out how and when to push changes to the server and client-side validations.

Now, you might think you are a very smart developer and you could write Twitter in a weekend and that frameworks and libraries are bloat that you&mdash;oh perfect developer&mdash;don't need. Well, you're wrong.

There is serious value in frameworks which have been around and in use for several years. The accumulated knowledge of hundreds of esoteric browser bugs and issues will save your ass when it's down to the wire and suddenly your site isn't working in IE8 on Windows XP with Cleartype disabled.

## JavascriptMVC $.Model

Compared to the Sencha and Sproutcore's robust data packages, JavascriptMVC's is somewhat simple. It embraces jQuery's AJAX methods and even places its classes on the jQuery "$" object. First, let's take a look at a model who's only goal is to represent a client-side object. We'll use it for organizing data and generating DOM elements, but save backend connectivity for later.

    // Setup the model definition
    $.Model.extend("Project",
    {
      // Static methods.
      // The following will appear as Project.fooBar()
      fooBar: function() {
        // Do something;
      }
    },
    {
      // Instance methods
      // The following will appear as myProject.similarProjects()
      similarProjects: function() {
        // Loop over all projects and find similar ones
      }
    });

    // Create an instance
    var myProject = new Project({ 
      name:  "Project 1",
      owner: "me"
    });
    
    // Get some values
    console.debug("My name is: " + myProject.name);

As you can see, the attributes defined on the model are relatively free-form. Simply pass them into the constructor and they'll be accessible in the model instance and to your instance methods. However, if you want to use some additional magic such an custom getters, setters and attribute conversions, you're going to need to use a jQuery-style proxy method to get and set attributes. Unsurprisingly, that method is called <tt>attr</tt>. Let's look at the same model, but with a helper method added.

    $.Model.extend("Project",
    {
    },
    {
      setTitle: function(newTitle) {
        // Optionally set some other attribute at the same time,
        // like a subtitle.
        
        // Makes sure the title is always uppercase.
        return newTitle.toUpperCase();
      }
    });

    var myProject = new Project();
    myProject.attr("title", "my title");
    console.debug("My title is: " + myProject.attr("title")); // MY TITLE

Now, whenever you use the <tt>attr</tt> helper to get or set the title, it will run through the <tt>setTitle</tt> method first. Alternatively, you could setup this conversion at the class level.

    $.Model.extend("Project",
    {
      attributes: {
        title: 'uppercase'
      },
      convert: function(original) {
        return original.toUpperCase();
      }
    },
    {
    });

In JavascriptMVC, you can bind models to DOM nodes. What this let's us do is to accept a click on a button, find the model it corresponds to and perform an action easily. I'll go into this more when talking about the JavascriptMVC view layer.

## $.Model with JSON APIs

Unless you're app uses something like LocalStorage to keep all the client data in the visitor's browser, you'll probably want to pull model data from a backend server. $.Model makes this shockingly easy in the basic case. Behold:

    $.Model.extend('Project',
    { 
      findAll: "projects", 
      findOne: "projects/{id}", 
      create:  "projects", 
      destroy: "projects/{id}", 
      update:  "projects/{id}" 
    },
    {
    });
    
Now you can interact with your server-side models very easily. For example:

    
    // Let's assume this returns the following JSON from "/projects":
    // [{ id: 1, name: "My Project" }]
    Project.findAll({ }, function(allProjects) {
      // An array of Project models
      allProjects;
    });

    // Let's assume this returns the following JSON from "/projects/1":
    // { id: 1, name: "My Project" }
    Project.findOne({ id: 1 }, function(myProject) {
      // Returns "My Project
      myProject.attr('name');
      
      // Triggers HTTP PUT to "projects/1"
      myProject.update('name', 'New name');
      
      // Triggers HTTP DELETE to "projects/1"
      myProject.destroy();
    });
    
    // Create new instance
    var newProject = new Project({ name: "New Project" });
    
    // Triggers HTTP POST to "/projects"
    newProject.save();

Awesomely simple. Keep in mind that the <tt>findAll</tt>, <tt>findOne</tt>, <tt>create</tt>, <tt>destroy</tt> and <tt>update</tt> class methods can be defined by you to handle any kind of backend service. If you need to parse XML or work with a bizarre API you don't control, this is where you'd do it.

[I wrote about client-side models]: http://awardwinningfjords.com/2011/01/25/client-side-mvcs-part-1-the-model-and-data-store.html
