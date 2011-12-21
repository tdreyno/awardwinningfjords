--- 
title: State Machine Controller for JavascriptMVC
date: 05/27/2010
---

[Checkout the Github repository]: http://github.com/secondstory/secondstoryjs-statemachine
[current version of JavascriptMVC 3 from their site]: http://v3.javascriptmvc.com/index.html
[JavascriptMVC Getting Started Guide]: http://v3.javascriptmvc.com/index.html#&who=getstarted

**[Updated]: The repository has moved to http://github.com/secondstory/secondstoryjs-statemachine. The main class has been renamed to SS.Controller.StateMachine**

**[Edit]: The SecondStoryJS State Machine now has a documentation website at <a href="http://secondstory.github.com/secondstoryjs-statemachine/">http://secondstory.github.com/secondstoryjs-statemachine/</a>**

I've been attempting to write this article for a week, but I've been unable to justify the usefulness of Finite State Machines in words. I tried written up some typical examples, such as the classic vending machine, but it kept getting very obtuse very quickly. Instead, let me just say, that I love Finite State Machines. I think they are the only technique I learned at school and when I am able to replace dozens of <tt>if</tt> statements with a Finite State Machine, it makes me very happy and feel secure. Being able to monitor an object's state, rather than just querying its instance variables, makes testing simpler and helps me find bugs.

If you need a Finite State Machine for JavascriptMVC, I've got one for you. In fact, every controller in my application uses it. The most common use-case is asyncronous loading, rendering and eventually interaction. Here's an example:

Finite State Machine Implementation
-----------------------------------

The goal of the following controller is to have widgets or panels which are made visible by clicking a link. Only one of the widgets may be visible at the same time and if you click the link for the currently open widget, it should toggle off. Each widget also contains a link for closing itself (<tt>a.close</tt>).

A state machine can respond to jQuery events, global OpenAjax messages and internal "publishState" commands. The destination states define which state we are moved into on an event. Finally, "onEnter" and "onExit" can point to either instance methods or global OpenAjax messages.

    :::JavaScript
    SS.Controller.StateMachine.extend("MyNavigation", {}, {
      states: {
        // Any click of the a.close element will close everything
        global:         { "a.close click":            "initial" },
      
        // Initial is the default state.
        // It will also represent "all closed"
        initial:        { onEnter:                    "closeDrawers",
                          "#header-thread a click":   "threadIsOpen",
                          "#header-timeline a click": "timelineIsOpen" },

        threadIsOpen:   { onEnter:                    "drawers.toggle.thread",
                          "#header-thread a click":   "initial",
                          "#header-timeline a click": "timelineIsOpen" },
                                       
        timelineIsOpen: { onEnter:                    "drawers.toggle.timeline",
                          "#header-timeline a click": "initial",
                          "#header-thread a click":   "threadIsOpen" }
      },
      
      "drawers.toggle.* subscribe": function(event_name) {
        this.closeDrawers();
        var elem_name = "#" + event_name.split(".").pop();
        $(elem_name).show();
      },
      
      closeDrawers: function() {
        $("#thread, #timeline").hide();
      }
    });
    
Clicking on #header-thread, #header-timeline and then #header-timeline again will print the following debug output:

    steal.js INFO: FSM (MyNavigation.instance0): initial -> threadsOpen
    steal.js INFO: FSM (MyNavigation.instance0): threadsOpen -> timelineOpen
    steal.js INFO: FSM (MyNavigation.instance0): timelineOpen -> initial

How Do I Get It?
----------------

First, get the [current version of JavascriptMVC 3 from their site].

Second, grab the code using JavascriptMVC's built-in <tt>getjs</tt> command:

    ./steal/js steal/getjs ss/state_machine
    
Next, create a Site and a Controller (see the [JavascriptMVC Getting Started Guide]).

We need to add our new plugin to the site. In appname.js, add the following to your <tt>steal</tt> command:

    :::JavaScript
    .plugins("ss/controller/state_machine")

Now you can extend your Controllers from <tt>SS.Controller.StateMachine</tt>.

Other/Better Examples?
----------------------

I would love a chance to show how this works will a less contrived example. If you've a complex controller and think something like this would be useful, then please email me and I'll port your code to using a state machine.
