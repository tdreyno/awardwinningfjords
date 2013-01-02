---
title: Aaron Quint on Javascript Hash URLs
date: 2011-02-11
blog_editor_id: 44
---

> Sammy and the ‘#’ are for applications. It provides a way to maintain state in a world where you can require JavaScript and even require the presence of certain browsers. If you’re an application, that requires login/signup you can make a number of demands of your users. You also probably dont even want the crawlability. You’re using ‘#’ to maintain state for a specific user in a specific session.
>
> Outside of the world of the ‘application’ you really, really shouldn’t rely on JavaScript being there for your site to work (at least at a basic level).<br />
> __- Aaron Quint__

Checkout the [full article] on [@aq]'s blog.

I'm definitely a fan of dynamic javascript applications which utilize the #! method to support the back-button and deep linking. I wrote a [Sammy-inspired Javascript URL router for JavascriptMVC] and I agree with Aaron. Dynamic URLs for applications, static sites for traditional content. Where Gawker went wrong with their redesign is by confusing the two.

[full article]: http://www.quirkey.com/blog/2011/02/10/ish/
[@aq]: http://twitter.com/aq
[Sammy-inspired Javascript URL router for JavascriptMVC]: http://secondstory.github.com/secondstoryjs-router/
