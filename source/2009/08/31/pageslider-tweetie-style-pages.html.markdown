---
title: Tweetie-style paging with pageSlider
slug: pageslider-tweetie-style-pages
date: 2009-08-31
---

[Tweetie for Mac]: http://www.atebits.com/tweetie-mac/
[JiveWorld09]:     http://www.jivesoftware.com/jiveworld/faqs

[Tweetie for Mac] is one of my favorite programs. However, it is also one of the least Mac-like applications I use. Instead of standard interactions, such as a tab control, for switching modes, Tweetie uses an iPhone-inspired
vertical slide. This is similar to the various carousel scripts around the web, but vertical rather than horizontal.

I recently need a little bit of gloss on a rather plain website, so I borrowed the effect. You can see the code implemented on the [JiveWorld09] conference site. You can also see the effect in the screencast below:

<div class='flash'>
  <object height='404' width='400'>
    <param name='allowfullscreen' value='true' />
    <param name='allowscriptaccess' value='always' />
    <param name='movie' value='http://vimeo.com/moogaloop.swf?clip_id=6371313&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=00ADEF&amp;fullscreen=1' />
    <embed allowfullscreen='true' allowscriptaccess='always' height='404' src='http://vimeo.com/moogaloop.swf?clip_id=6371313&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=00ADEF&amp;fullscreen=1' type='application/x-shockwave-flash' width='400'></embed>
  </object>
</div>

[http://github.com/tdreyno/pageSlider]: http://github.com/tdreyno/pageSlider
[code-zip]: http://cloud.github.com/downloads/tdreyno/pageSlider/pageSlider.zip
[See the demo here]: /pageSlider/demo.html

The Source
----------

You can grab the code on Github at[http://github.com/tdreyno/pageSlider]
or in [this zip file][code-zip].

How to Use
----------

First, and foremost, you will need jQuery and jQuery.history to provide the back-button support. These are included on GitHub and in the downloadable zip file.

The code is implemented as a jQuery plugin which is called on a collection of pages in the current html document. You must have a div which contains the pages (defaults to having an id of <tt>maincontent</tt>) and then you will select the pages and apply the plugin. In the example below, each page has a class of <tt>page</tt>. That same div must also have a <tt>title</tt> attribute declaring the unique name for referring to that page.

There are also some CSS caveats. The containing element must be set to <tt>overflow: hidden;</tt>. Additionally, calculating heights on the pages can be difficult. The best way is to set a padding on the <tt>.page</tt> so margins don't leak outside it's box.

    :::html
    <head>
      <style type="text/css">
        #maincontent {
          overflow: hidden; }
        .page {
          padding: 5px; }
      </style>
      <script src="jquery-1.3.2.js" type="text/javascript"></script>
      <script src="jquery.history.js" type="text/javascript"></script>
      <script src="jquery.page-slider.js" type="text/javascript"></script>
      <script type="text/javascript">
        $(document).ready(function() {
          $('.page').pageSlider();
        });
      </script>
    </head>
  
    <body>
      <div id="maincontent">
        <div title="home" class="page">
          Home page
        </div>
        <div title="page2" class="page">
          Page number two
        </div>
      </div>
    </body>

Now, whenever the "history" hash (the #page location in the URL) is changed, the javascript will slide to the requested piece. Normal links such as &lt;a href="#page2"&gt; can be used to trigger the effect. The back-button will also change the history and thus trigger the animation.

Configuration
-------------

The plugin needs to know the containing element to slide inside of.

<ul><li><tt>containerSelector</tt> sets the text of the "on" state. Defaults to: <strong>#maincontent</strong></li></ul>

    :::javascript
    $('.page').pageSlider({
      containerSelector: "#frame"
    });

Events
------

The plugin calls a <tt>changingPage</tt> event whenever the animation begins. If you have dependent elements you want to update together with the slide, you can attach them to the event via the normal jQuery event model. This callback is used in the video above to update the sidebar navigation when the history changes.

    :::javascript
    $(document).bind('changingPage', function(anchor_name) {
      // Update some other dependent element based on anchor_name
    });

Demo
----

[See the demo here].