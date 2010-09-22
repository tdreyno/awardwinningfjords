--- 
title: Handling Touch Events in jQuery Tools Scrollable
date: 22/09/2010

[jQuery Tools Scrollable]: http://flowplayer.org/tools/scrollable/index.html
[DoubleTap for jQuery]: http://github.com/technoweenie/jquery.doubletap
[according to this commit]: http://github.com/jquerytools/jquerytools/commit/d63892b54a85e00bb73ce248f8db29acf327d293

**[EDIT]: Looks like jQuery Tools Scrollable will support touch natively in their next release [according to this commit].**

Today I was trying to optimize the experience of a website for the Apple iPad. One quick win is to respond to touch events on the device which will make your site feel much smoother and avoid the double tapping which Mobile Safari sometimes requires to activate javascript links. Additionally, your very nice paging controls may not be large enough to comfortably tap on the device (the common wisdom is touch targets need to be at least 40px square). A simple swipe can go a long way towards addressing these issues.

So, how can we get the Scrollable widget to handle touch events?

First, you'll obviously need the [jQuery Tools Scrollable] widget.

Next, you'll need Rick Olson's excellent [DoubleTap for jQuery] which adds touch events to jQuery's event system.

Finally, you'll need to write the glue:

    :::JavaScript
    $.fn.handleSwipes = function() {
      return this.each(function() {
        var api = $(this).data("scrollable");

        api.getRoot().addSwipeEvents()
           .bind('swipeleft', function() {
             api.next();
           })
           .bind('swiperight', function() {
             api.prev();
           });
      });
    };

Once you have all three of these components on a page, initialize them like so:

    :::JavaScript
    $(".scrollable").scrollable().handleSwipes();

Now touch swipes will trigger the next and previous behavious built into the widget. Enjoy.
