---
title: Window Location in UIWebView

---

Which question. How do you get the current URL of a page in a `UIWebView` context (link followed from Twitter, Facebook, Gmail.app, etc)? If you said, `window.location.href`, **you'd be wrong**.

In the final hours of testing before a new site launch, users with access to the soft launch reported that none of our links worked if they opened the link we sent them in the Gmail iOS app.

We're using `#!` URLs throughout the single-page site so we can deep-link and support browsers all the way back to oldIE. When you link a link in the app, the URL changes and notifies our code to navigate to a new "page". Our router, the code that maps URL changes to pieces of our code, correctly recieves the `onhashchange` when someone clicks a link, but when the router goes to lookup the URL, using `window.location.href`, it gets back: `undefined`. Uh oh. In fact, all properties on `window.location` are undefined, including `hash`, `hostname`, etc.

For some reason, despite the fact that `window.location.href` is **writable** and setting it will change the URL as expected, reading it is impossible with a `UIWebView`.

### The Workaround

I basically looked at every property on `window` and `document` to find something URL-y. What I ended up with was: `document.URL`. I've never heard of it, but [apparently it's been around forever and is read-only](https://developer.mozilla.org/en-US/docs/DOM/document.URL).

Our router code now looks like:

	router.recognize(window.location.href || document.URL);

And everythings working great. Crisis averted.

### The Offenders

After a brief look around libraries I've used, I don't see that any of them are aware of, or work around, this problem (unless I'm completely mistaken). Google Closure Library, Ember.js and Sammy all hardcode `window.location.href` as the canonical source of the current URL. I'll be submitting bugs and pull requests as soon as I make sure I'm not crazy.

It should also be noted that many routers actually prefer HTML5 History/pushState in browsers which support it, only falling back to `!#` for older browsers. In this case, `UIWebView` works fine, so my guess is not many people opt-in to an older technology and then expect it to work in an alien environment like a sandboxed mobile browser.

### The Debugger

Another wrinkle, is that `UIWebViews` aren't remotely debuggable by default. They swallow errors. You can enable remote debugging, in Obj-C, but that doesn't help if you don't control the app (Facebook, Gmail, etc).

To work around this, I used PhoneGap to create my own application which enables remote debugging by default. Now Safari 6 can plug into it and I can inspect values and see exceptions.