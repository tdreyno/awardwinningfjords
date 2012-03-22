---
title: Middleman 3.0 Beta
date: 2012-01-03
---

[the Github issue tracker]: https://github.com/middleman/middleman/issues
[Zurb Foundation]: http://foundation.zurb.com/

Middleman is a small tool for developing stand-alone, static websites. It's great for separating frontend development from the backend, developing blazingly fast static websites or quickly creating prototypes. Middleman brings all of the power of Rails to provide an incredibly powerful development environment with access to:

* Templating engines and layouts (ERb, Slim, Haml, anything supported by Tilt)
* Preprocessors (CoffeeScript, Sass, Less, Stylus, etc)
* Compression (Minify CSS, JS and images)
* Post-compile callbacks for deployment
* And lots of new stuff in 3.0

### Install the Beta

Before getting in to all the new features, here's how you can install the beta:

    :::bash
    gem install middleman --pre

__Remember:__ This is a beta and there are bound to be bugs and possible regressions. 3.0 should be fully backwards compatible with 2.x. Please submit any issues you run into on [the Github issue tracker].

### New Features

Let's dive in.

*   
    #### middleman-core & middleman-more
    
    The middleman gem has been split into 2 smaller gems. middleman-core contains everything you need to run a simple Middleman project, but does not include any templating languages other than ERb or any compiled extensions. This means you *should* be able to install middleman-core on systems without a compiler. You won't have access to things like CoffeeScript, Sass, Sprockets or asset compression, but many users don't need these extra features. The full dependency list for middleman-core is: activesupport, fssm, rack, rack-test, thor & tilt.

    middleman-more contains everything not in middleman-core. Combining the two will work exactly as middleman 2.x did. In fact, this is exactly what installing the middleman gem directly does.

*   
    #### Direct Preview
    
    Sometimes you just want to host a directory of web assets on localhost without doing anything fancy. In 3.0, Middleman will do just this if you run it from a directory with a `config.rb` file. For example: 

        :::bash
        # Download the Zurb Foundation: http://foundation.zurb.com/
        cd foundation
        middleman server

    Now the [Zurb Foundation] will be available at: http://localhost:4567/

*   
    #### Sass, Compass and Sprockets

      Sass and Scss file now have access to Sprockets dependency management and to CSS located in gems which support the Rails 3.1 Asset Pipeline. Given a "source/stylesheets/main.css.scss":

        :::css
        /**
         *= require "some_partial"
         *
         * Using Zurb as an example: gem install zurb-foundation
         *= require "foundation/typography"
         */
    
        body {
          /* My code */
        }

*   
    #### Nested Layouts

    As an alternative to partials and content_for blocks, we've added something from the Django world. Say I have a template named "source/index.html.erb" and it's layout is located at "source/layouts/default.erb". Normally, the contents of the layout will wrap the contents of the template. With nested layouts, I can add the following to the layout and wrap the contents yet again:

        :::erb
        <% wrap_layout :admin do %>
          I am the Defaul Layout
          <%= yield %>
        <% end %>

    Now, the final contents will be the template, wrapped in the default layout, wrapped in the admin layout. This can continue indefinitely.

*   
    #### The Sitemap

    The Sitemap is a new, internal cache of all the pages in your project. It can be inspected for building navigation, scraping pages for frontmatter or all manner of metaprogramming. When you add, remove or change a file, the sitemap is automatically updated.

    Here's a quick example for building an index page which displays an automatically updating list of it's child pages.

        :::erb
        <% for page in current_page.children %>
          <%= link_to page.data.title, page.url %>
        <% end %>

    As you'll notice, the page object has access to that page's frontmatter. This means we can use frontmatter to provide categorization and work with that data. Say we have several pages with the following frontmatter (and several without it):

        :::yaml
        ---
        category: internal
        ---

    Now we can select only the pages with that category to display in our list of links:

        :::erb
        <h1>Internal</h1>
        <% for page in current_page.children.select { |x| x.data.category == "internal" } %>
          <%= link_to page.data.title, page.url %>
        <% end %>

*   
    #### Miscellaneous Changes

    * Rewritten to work directly with Rack (Sinatra apps can still be mounted)
    * Yard code docs: http://rubydoc.info/github/middleman/middleman
    * 3rd Party Command Line Tools
    * Activate mobile html5boilerplate template
    * Support for placekitten.com
    * Activating extensions can now take an options hash
    * Don't re-minify files with ".min" in their name
    * Enable chained templates outside of sprockets (file.html.markdown.erb)
    * Removed old 1.x mm- binaries, please use the main "middleman" binary from now on