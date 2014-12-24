---
title: UINavigationController implementation for SenchaTouch
date: 2010-07-02
blog_editor_id: 62
---

[SenchaTouch]: http://www.sencha.com/products/touch/
[several very impressive demos]: http://www.sencha.com/products/touch/demos.php

[SenchaTouch] is web development framework for building native-looking mobile apps (iOS &amp; Android) using standards-based web technologies such as HTML5 &amp; CSS3. The Sencha website features [several very impressive demos]. However, the framework is still in beta and many useful features are either incomplete or missing entirely.

One common interaction in iPhone applications is multi-level navigation which places a back button in the toolbar and allows the user to drill down into the data. In a native app, the <tt>UINavigationController</tt> class manages this&nbsp;hierarchy&nbsp;of views and asks the currently selected view information about itself for display. For example, the current view may have a <tt>navigationTitle</tt> of "Tier 1" and its child view may have a <tt>navigationTitle</tt> of "Tier 2."&nbsp;UINavigationViewController will inspect these&nbsp;views and make sure the correct title is visible in the navigation bar according to the currently selected view. See the diagram below:

<img src="http://files.posterous.com/temp-2010-07-02/bwAhfIJeckcGGuGdeEtylgJJanitascAdxyEdziptsBpmmaDGschrlzbyrIx/navigation_interface.jpg?AWSAccessKeyId=1C9REJR1EMRZ83Q7QRG2&Expires=1280251911&Signature=6PnQ/gmFo0jFitRh9D2S3Y2BOZc%3D" />

SenchaTouch has something similar with the NestedList class which shows a&nbsp;hierarchy&nbsp;of <tt>Ext.List</tt> panels. However, it would be nice to have something much more generic that allows any type of panel to be placed in the&nbsp;hierarchy. Below this post is the source code for <tt>PanelStack</tt> which functions much like&nbsp;<tt>UINavigationController</tt>. Each panel in the stack can push more panels beneath it or pop itself off the stack (identical to pressing the back button). Additionally, each panel is has an animation property which is run on push and reversed on pop making interactions such as flipping a card over to see its back and then returning to the front very easy to accomplish.

How to use PanelStack
---------------------

    var bottomLevel = new Ext.Panel({ title: "Start page" });
    var firstLevel  = new Ext.Panel({ title: "Tier 1" });
    var secondLevel = new Ext.Panel({ title: "Tier 2" });

    var controller  = new PanelStack({ items: [bottomLevel] });
    // Showing the bottomLevel, a title of "Start page" and no back button

    controller.pushPanel(firstLevel);
    // Showing the firstLevel, a title of "Tier 1" and a "back" button

    controller.pushPanel(secondLevel);
    // Showing the secondLevel, a title of "Tier 2" and a "back" button

    controller.popPanel();
    // Showing the firstLevel, a title of "Tier 1" and a "back" button

    // Manually tapping the "back" button
    // Showing the bottomLevel, a title of "Start page" and no back button

The current code for the class is below.
----------------------------------------

<script src="http://gist.github.com/461744.js"></script>

