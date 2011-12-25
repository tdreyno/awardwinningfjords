--- 
title: Apple-style Gradient Text Headlines in SCSS/SASS
date: 04/13/2010
---

Apple's effect looks like this:

<img src="http://src.sencha.io/-30/http://dl.dropbox.com/u/102356/Screenshot.png" />

This effect only works in Webkit-based browsers like Safari and Chrome at this time and requires Sass 3 and the most recent version of Compass:

    h1 {
      @include linear-gradient(color-stops(#999, black));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

Or, if you prefer plain CSS:

    :::css
    h1 {
      background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, 
                        color-stop(0%, #999999), 
                        color-stop(100%, #000000));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

Which renders as:

<img src="http://src.sencha.io/-30/http://dl.dropbox.com/u/102356/Screenshot-1.png" />
