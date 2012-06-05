---
title: "Coda Pops Technical Details"

---

[Panic's site]: https://panic.com/coda/
[the Mac App Store]: http://itunes.apple.com/us/app/coda-2/id499340368?mt=12
[jQuery]: http://jquery.com
[jQuery UI]: http://jqueryui.com
[EmberJS]: http://emberjs.com

First and foremost, Coda 2 is out! Get it from [Panic's site] or [the Mac App Store].

Now, what are Coda Pops? Coda 1 has an integrated CSS editor sidebar which provided some simple form elements for editing CSS styles. This sidebar has gone away in version 2, but the void has been filled by Coda Pops which are context-aware UI popups that provide controls for generating CSS. There are 10 of them in the current release and they look like this:
    
<a href="/projects/coda/radius.png"><img src="/projects/coda/radius-small.png" alt="Border Radius" align="left"></a>
<a href="/projects/coda/border-width.png"><img src="/projects/coda/border-width-small.png" alt="Border Width" align="left"></a>
<a href="/projects/coda/margin.png"><img src="/projects/coda/margin-small.png" alt="Margin" align="left"></a>
<a href="/projects/coda/padding.png"><img src="/projects/coda/padding-small.png" alt="Padding" align="left"></a>
<br clear="all">

<a href="/projects/coda/border.png"><img src="/projects/coda/border-small.png" alt="Border" align="left"></a>
<a href="/projects/coda/box-shadow.png"><img src="/projects/coda/box-shadow-small.png" alt="Box Shadow" align="left"></a>
<a href="/projects/coda/text-shadow.png"><img src="/projects/coda/text-shadow-small.png" alt="Text Shadow" align="left"></a>
<br clear="all">

<a href="/projects/coda/color.png"><img src="/projects/coda/color-small.png" alt="Color" align="left"></a>
<a href="/projects/coda/gradient.png"><img src="/projects/coda/gradient-small.png" alt="Color" align="left"></a>
<a href="/projects/coda/styles.png"><img src="/projects/coda/styles-small.png" alt="Style List" align="left"></a>
<br clear="all">

## Technical Details

Each Pop is implemented in HTML/CSS/Javascript and lives within the Coda application bundle. An included `.plist` file tells Coda in which contexts a Pop should be presented.

The Coda application provides several methods to the Javascript environment to read-in the string contents being passed in from Coda, notify Coda of a string change in response to changes in the Pop UI, read/write Pop-specific preferences and finally dismiss the Pop.

To encapsulate these interactions and provide common utilities for all Pops, a library was created known as PopKit.js. This library is neither public or supported at this time, but Panic has plans to make Pops user-expandable in the future. For the curious, here are the details.

## PopKit.js

PopKit.js is built upon:

* [jQuery] 1.7.2
* [jQuery UI] 1.9 Alpha
* [EmberJS] 0.9.7.1

jQuery and jQuery UI provide a foundation most web developers would be comfortable working with. EmberJS is my preferred frameworks for Javascript applications which have interactive UI elements, must respond quickly and condense the state of the application. What this means is, EmberJS allows me to create controllers for every UI element and have their individual updates processed into a single string, the output CSS, quickly and easily. The Color and Gradient Pops are probably the most complex, with Hue, Opacity sliders interacting in real-time with the mouse loupe color picker.

The actual PopKit library is only 500 LOC. It provides a thin wrapper around the communication with the Coda App, a root "Application" class for Pops to extend from, Color parsing and manipulation, and UI controls for slider controls and buttons.

I've provides the HTML and Javascript contents of the Border Pop below. I'm personally proud of their brevity and readability, given that they create complex and beautiful UI.

<script src="https://gist.github.com/2848655.js?file=border.html"></script>

<script src="https://gist.github.com/2848655.js?file=border.js"></script>

## Moving Forward

Going forward, I'd like to see this library become a foundation for user-created Pops, but that's going to require some additional work.

#### Consistent Code Style

I used CoffeeScript to quickly build the library, but if it were to become a public library, I would refactor away the cruft left behind by the CoffeeScript compiler. We only need to support WebKit so some shims could be removed and we could standardize our variable names and other basics.

#### Code Documentation

There is inline-docs in my source CoffeeScript version, but these are stripped by the compiler.

#### Depend on non-beta Libraries

This would mean waiting until Ember 1.0 and jQuery UI 1.9 are released.

#### Centrally Host Libraries

Right now, each pop contains uncompressed versions of the entire stack. This isn't great for file size or re-usability. Once this is a supported library, it can be moved into a central location, compressed and made available to all Pops.

### Future Pop Ideas

* Expanding Pops outside of CSS
* A Style Guide Pop, which lets you setup themes and apply them.
* Sass color manipulation preview Pop
* Sprite image preview/picker Pop
* Multi-prefix editing (or prefix-free previewing)
* Diet Coda support?

## Thanks

Finally, I just want to say thanks to Panic for letting me be part of this amazing app. They're great guys and it's wonderful to finally see Coda 2 in the wild.