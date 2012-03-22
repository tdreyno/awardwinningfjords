--- 
title: jQuery.Deferred Image Preloader
date: 2011-05-03
---

[jQuery.Deferred]: http://api.jquery.com/category/deferred-object/

A little wrapper around <tt>[jQuery.Deferred]</tt> for an image preloader.

READMORE

    var loadImageCache = {}
    var loadImage = function(imageSrc) {
      if (typeof loadImageCache[imageSrc] === "undefined") {
        deferred = $.Deferred();
  
        preloader         = new Image();
        preloader.onload  = function() { deferred.resolve(this.src) };
        preloader.onerror = function() { deferred.reject(this.src)  };
        preloader.src     = imageSrc;

        loadImageCache[imageSrc] = deferred;
      }
      
      return loadImageCache[imageSrc];
    }

Requires jQuery 1.5 or newer:

    loadImage("http://my/image.jpg").then(function(url) {
      alert(url + ' is preloaded');
    });
    
The code will only preload each url once, you can reuse the deferred object and add additional <tt>then</tt> callbacks to that object anywhere in your code.