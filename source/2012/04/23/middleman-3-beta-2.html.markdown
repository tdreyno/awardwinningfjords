---
title: "Middleman 3.0 Beta 2"
date: 2012-04-23
---

[the Github issue tracker]: https://github.com/middleman/middleman/issues
[the Beta 1 announcement]: /2012/01/03/middleman-3-beta.html
[writing tons code]: https://github.com/middleman/middleman/commits/master?author=bhollis

### What is Middleman?

Middleman is a small tool for developing stand-alone, static websites. It's great for separating frontend development from the backend, developing blazingly fast static websites or quickly creating prototypes. Middleman brings all of the power of Rails to provide an incredibly powerful development environment with access to:

* Templating engines and layouts (ERb, Slim, Haml, anything supported by Tilt)
* Preprocessors (CoffeeScript, Sass, Less, Stylus, etc)
* Compression (Minify CSS, JS and images)
* Post-compile callbacks for deployment
* And lots of new stuff in 3.0

### Install the Beta

Before getting in to all the new features, here's how you can install the beta:

    gem install middleman --pre

__Remember:__ This is a beta and there are bound to be bugs and possible regressions. 3.0 should be fully backwards compatible with 2.x. Please submit any issues you run into on [the Github issue tracker].

### New Features Since Beta 1

__Read about the other 3.0 features, discussed in [the Beta 1 announcement].__

First, and foremost, I want to recognize the incredible contributions Ben Hollis has made to Middleman in the past 6 months. He's been [writing tons code], including some of the features below, as well as managing the community and helping keep me some making stupid errors by commenting on my commits. He's also refactoring the `middleman-blog` extension, which will be 3.0-compatible very soon.

So, here are some new features:

*   
    #### Bundler Required
    
    Most non-Rubyists, and many active Rubyists, are constantly fighting with Rubygems when using Middleman. Our solution in 2.0 was to allow the use of Bundler Gemfiles to lock down the Middleman environment. This was great, but only Ruby developers knew how to use it. In 3.0, Bundler in built directly into Middleman. All new projects generate a Gemfile. In the future, we hope to provide CLI commands for managing a Middleman project, such as: `middleman upgrade`, to rebundle a project with a newer release of Middleman. 

*   
    #### i18n Built-in
    
    The `middleman-i18n` extension has been merged into core. We hope to further expand its functionality to make Middleman the best possible solution for building multi-lingual websites.
     
*   
    #### `gzip` and `asset_hash` extensions
    
    Two new optimization extensions are available in Beta 2. 
    
    `gzip` will compress your assets during a build, but it will be up to you to serve them. 
    
    `asset_hash` is an alternative cache-busting scheme, targeting CDNs. The current `cache_buster` extension simply adds a querystring to asset paths, which busts the cache in browsers. CDNs actually require that the name of the file is changed. `asset_hash` will insert a hash of the file into the file names of your assets during build.

*   
    #### Implied output extensions
    
    Templating engines can now set a default output extension. For example, `.erb` now implies `.html` so `my-template.erb` will ouput to `my-template.html`. The 2.0 functionality, of including both the template extension and the output extension in the file name is still prefered. 
     
*   
    #### Miscellaneous Changes

    * Activate mobile html5boilerplate template
    * Update html5boilerplate template to version 3
    * Don't re-minify files with ".min" in their name
    * Automatically load helper modules in helpers/ directory
    * Add pid for cleanup
    * Use guard/listen for file watching
    * Errors stop the build and print a stacktrace rather than silently getting printed into files.
    * `with_layout` works with globs or regexes.
    * Setting `directory_index` from `page` with a glob or regex now works.
    * Properly output Compass-generated sprited images.
    * Include vendored assets in sprockets path.
    * Switch built-in CSS compressor to Rainpress.
    * Automatically load helper modules from `helpers/`, like Rails.
    * `ignore` and `page` both work with file globs or regexes.
    * `layout`, `ignore`, and `directory_index` can be set from front matter.
    * JavaScript and CSS are minified no matter where they are in the site, including in inline code blocks.