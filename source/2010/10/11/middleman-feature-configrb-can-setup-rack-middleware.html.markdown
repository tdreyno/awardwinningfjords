--- 
title: "Middleman Feature: Config.rb can setup Rack middleware"
date: 11/10/2010
---

[Middleman]: http://middlemanapp.com
[rack-codehighlighter]: http://github.com/wbzyl/rack-codehighlighter

Did you know that since [Middleman]'s <tt>config.rb</tt> is evaluated by Sinatra that it can initialize Rack middleware?

In the code sample below, I use the [rack-codehighlighter] middleware to add syntax highlighting to a Middleman project.

<script src="http://gist.github.com/621390.js?file=config.rb"></script>
