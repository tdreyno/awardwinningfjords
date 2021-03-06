---
title: The Middleman. A modular, feature-rich static site generator
date: 2009-10-22
blog_editor_id: 73
---

[StaticMatic]: http://staticmatic.rubyforge.org/
[Nanoc]:       http://nanoc.stoneship.org/
[nanoc-docs]:  http://nanoc.stoneship.org/manual/
[Slickmap]:    http://astuteo.com/slickmap/
[on the project website]:   http://middlemanapp.com
[Middleman version 2.0 has been released]: /2011/08/08/middleman-2-0.html
[Middleman version 1.1 has been released]: /2011/04/15/middleman-v11.html
[Middleman Support Forum]: https://convore.com/middleman/

**Update: [Middleman version 2.0 has been released]**<br />
**Update: [Middleman version 1.1 has been released]**<br />
**Update: New [Middleman Support Forum]**

Developing large sites can be a tedious process. First of all, a large portion of each page will contain some amount of shared code. You have site-wide navigation, footers, javascript and CSS. Within those sections you may have other common data such as color schemes, asset paths and tracking codes. Experienced developers will see this problem coming from a mile away and start the project with site-wide constants and common components separated into their own reusable files. This works pretty well if you are developing in the same framework or language that the site will eventually operate under in production, but what if your job is strictly front-end and you have no advanced knowledge of the backend which will display your pages?

The two most common approaches I've encountered are to develop every page statically with shared components repeated in each and every file. Alternatively, many developers assume global familiarity with PHP or ASP and use some form of Server-Side Include for shared components. The situation gets a bit trickier for global constants and shared paths. I've seen PHP variables scattered throughout a site. I've also seen IDE-specific includes (like Textmate's) used for shared content and variables. 

These approaches have a couple problems. First, they assume the client cares what technology you use. Second, they require you to deploy the site to a web-server before the client can preview the design. And finally, the backend team will probably be frustrated with your PHP unless they just so happen to use it as well.

The solution is to use strong backend tools and concepts like variables, helper functions, layouts (or MasterPages) and javascript/css minifiers while still delivering plain old, static HTML to the client.

Existing solutions
------------------

The Ruby world already has a handful of tools which accomplish this. The two most common, in my opinion, are [StaticMatic] and [Nanoc]. I have far more experience with StaticMatic so I'll talk about that first.

StaticMatic is heavily inspired by Ruby on Rails and performs it's task in a similar, but still slightly different, way. I've used StaticMatic for years, contributed to it's codebase and converted anyone who would listen to using it. It allowed me to use Haml & Sass in static pages and I loved it. However, I have my own opinions and StaticMatic does a lot of little things differently than I'd like. Rather than fork that project or complain online, I wrote my own replacement which fits my style of development more closely. Apples and oranges in my opinion, but maybe other developers will be more at home with Middleman, like I am.

Nanoc, on the other hand, looks very, very powerful. Unfortunately, I've been frequently overwhelmed by the [documentation][nanoc-docs] and feature set. Like I said above, I'm scratching my own itch and Nanoc provided a lot more than I needed while requiring a lot of Ruby-writing to work with. I see Middleman as the Sinatra of the static deployment world. There are bigger, and arguably better, systems out there, but my niche is small, easy to learn and fast.

Middleman
---------

The best way to describe Middleman is to show you how I use it. I'll show you how to install it a little further down. The <tt>mm-init</tt> command takes a single argument, the directory which will contain your new project. If I run that command from the terminal, I will get the following:

    # mm-init .
    Generating with setup generator:
         [ADDED]  init.rb
         [ADDED]  views/index.html.haml
         [ADDED]  views/layout.haml
         [ADDED]  views/stylesheets/site.css.sass
         [ADDED]  public/stylesheets
         [ADDED]  public/javascripts
         [ADDED]  public/images

The initializer creates a homepage (index.html.haml), a layout to contain shared interface elements and a site-wide stylesheet. As you can see, Haml and Sass are the default templating languages. However, you're free to replace .haml with .erb and use Erb templates or enable additional renderers like Markdown (more on this later). The Sass support comes with Compass bundled to provide a large number of css frameworks such as YUI, Blueprint, 960.gs, Susy and more.
  
The init.rb file allows customization and enabling or disabling specific features. The default init.rb looks like this:

    # Helpers
    helpers do
    end

    # Generic configuration
    # enable :slickmap

    # Build-specific configuration
    configure :build do
      # For example, change the Compass output style for deployment
      # enable :minified_css

      # Or use a different image path
      # set :http_path, "/Content/images/"

      # Disable cache buster
      # disable :cache_buster
    end

Helpers are functions which can be called from your templates and allow you to abstract frequently repeated code. Middleman comes with a handful, most for asset management, but you can write your own within the helpers block in the init.rb.

Next is the commented-out [Slickmap] feature. If you remove the comment, your structure will be parsed and a sitemap will automatically be generated for you. There are many other features you can enable or disable and this is the place to do it.

Finally, there is the configure block which allows variables, helpers and features to be modified only during the final static HTML build process. The example init.rb offers css minification, cache busting and changing the location of your assets in production (if you're using a CDN).

Configuration & an Example
--------------------------

The <tt>mm-init</tt> command creates an init.rb which will contain your customizations and configuration.

Below is an example init.rb that I am using on a live client site. First, I include a couple files with helper definitions. Next I enable php files to be previewed and choose the default template for directory requests. For this project, I have chosen to place all static files under the "assets" folder. The asset_url helper is overridden to ignore a couple cases specific to this site. Finally, I setup the directory under which the site will live in production. That's it! Nearly 200 pages with a shared layout, simple Haml templates, Blueprint-base CSS grids, minified CSS, Javascript dependency management and minification, CDN support and cache busting query strings.

    require 'config/path_helpers'
    require 'config/haml_helpers'

    mime :php, "text/html"
    set :index_file, "index.php"
    set :images_dir, "assets/images"
    set :css_dir, "assets/stylesheets"
    set :videos_dir, "assets/videos"
    set :js_dir, "assets/javascripts"

    configure :build do
      set :http_prefix, "/sites/billboard"
      enable :automatic_image_sizes
    end

Features
--------

As you can see, the basic project is quite sparse and you get to choose which features your project needs. 
The current list of features is as follows:

    # Features enabled by default
    enable :compass
    enable :sprockets
  
    # Features disabled by default
    disable :slickmap
    disable :cache_buster
    disable :minify_css
    disable :minify_javascript
    disable :relative_assets
    disable :maruku
    disable :automatic_image_sizes
    disable :minify_css
    disable :minify_javascript
    disable :cache_buster

More documentation on these features and what they enable can be found [on the project website].
  
Development Process
-------------------

So, the quickest way to get started is to run <tt>mm-init</tt> and point it at a location for your new project. Then change directories into that project and run <tt>mm-server</tt>. Now you can develop your site and preview the results on localhost:4567. Finally, when you're ready to deliver raw HTML, run <tt>mm-build</tt> from the project folder. Here's an example.

    Gir:~ tdreyno$ mm-init new_project
    Generating with setup generator:
         [ADDED]  init.rb
         [ADDED]  views/index.haml
         [ADDED]  views/layout.haml
         [ADDED]  views/stylesheets/site.sass
         [ADDED]  public/stylesheets
         [ADDED]  public/javascripts
         [ADDED]  public/images
       
    Gir:~ tdreyno$ cd new_project/
    Gir:new_project tdreyno$ mm-server 
    == Local config at: /Users/tdreyno/new_project/init.rb
    == The Middleman is standing watch on port 4567
    >> Thin web server (v1.2.4 codename Flaming Astroboy)
    >> Maximum connections set to 1024
    >> Listening on 0.0.0.0:4567, CTRL+C to stop
  
    Gir:new_project tdreyno$ mm-build 
    == Local config at: /Users/tdreyno/new_project/init.rb
    Generating with build generator:
         [ADDED]  index.html
         [ADDED]  stylesheets/site.css

         >> Thin web server (v1.2.4 codename Flaming Astroboy)
         >> Maximum connections set to 1024
         >> Listening on 0.0.0.0:4567, CTRL+C to stop

Source & bug reports
--------------------
[http://github.com/middleman/middleman]:        http://github.com/middleman/middleman
[http://wiki.github.com/middleman/middleman]:   http://wiki.github.com/middleman/middleman
[http://github.com/middleman/middleman/issues]: http://github.com/middleman/middleman/issues

The code, as always, is on GitHub at: [http://github.com/middleman/middleman].<br />
There is also a wiki at: [http://wiki.github.com/middleman/middleman].<br />
And finally, please report bugs to: [http://github.com/middleman/middleman/issues].