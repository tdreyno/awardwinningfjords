---
title: 'New Features: Image Optimization, CDN and Gzip Support'
blog_editor_id: 93
---

Today I'm happy to announce the first round of new [Fjords](http://fjords.cc) features. If you're not yet a user, [find out more on the website](http://fjords.cc).

First, you'll need to update the Command-line Tool or Middleman extension to version **1.1.0**. This is as easy as:

    gem update fjords

For Middleman, update your `Gemfile` to:

    gem "middleman-fjords", "~> 1.1.0"

Now, let's get to the fun stuff.

## Automatic Image Compression

One of our goals going forward is to help make your websites as fast as possible without our users having to worry about it. As of today, all pushes to Fjords will automatically run all images through a bunch of image compression tools: AdvPNG, Pngcrush, extended OptiPNG, JpegOptim, jpegrescan, jpegtran, and Gifsicle.

These tools can losslessly shrink the size of your image assets by about 30%. Photoshop should really do this for you, but it doesn't so we'll pick up the slack. [Check out this article](http://imageoptim.com/tweetbot.html) by the ImageOptim developer on the kind of savings you can now expect.

We're investigating an option to automatically minify your CSS, JS & HTML as well.

## Serve Gzipped Assets

Gzipping assets is an easy way to drastically cut the size of CSS, JS and HTML assets which the browser has to download. In systems with a dynamic backend, that backend can detect whether the browser wants Gzip content and respond accordingly. Unfortunately, in a purely static system like Fjords, we have to either detect what the browser wants in Javascript or choose to send Gzipped content to all browsers.

Fjords 1.1.0 will allow you to enable Gzip support on your assets. It's as easy as:

    fjords gzip:enable my-site.fjords.cc

From now on, all browsers will get Gzipped content. Please be patient as we need to compress and re-deploy all your content in the background.

If you change your mind:

    fjords gzip:disable my-site.fjords.cc

**Note: If you're using Middleman's `:gzip` feature, you should disable that before activating this.**

## CDN (Content Delivery Network)

CDNs are the fastest way to serve static content. If you want your site to be lightning fast, enabling CDN support will push your content to web servers around the globe. When it comes to hundreds of milliseconds-per-request, having the server with your content physically closer to your users makes a huge difference.

Enabling the CDN for your site will cost $2 per month. It also takes longer to deploy around the world, so it may take up to an hour for your updated content to appear in all locations.

Here's how it works:

    fjords cdn:enable my-site.fjords.cc

Now you have two options. `my-site.fjords.cc` will load the non-CDN version and `my-site-cdn.fjords.cc` will load the CDN copy. Point your DNS at the newly available `-cdn` domain.

If you decide the extra speed isn't worth it to you, you can disable it.

    fjords cdn:disable my-site.fjords.cc

#### Sound Interesting? [Find Out More](http://fjords.cc)