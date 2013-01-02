---
title: Middleman v1.1
date: 2011-04-15
blog_editor_id: 40
---

[I introduced Middleman on this blog]: /2009/10/22/middleman
["Future of Middleman Survey"]: /2011/02/06/future-of-middleman-survey
[See more here]: http://www.sinatrarb.com/extensions-wild.html
[Frank project]: https://github.com/blahed/frank
[HTML5 Boilerplate]: http://html5boilerplate.com/
[Pow webserver]: http://pow.cx/
[Middleman version 2.0 has been released]: /2011/08/08/middleman-2-0.html

**Update: [Middleman version 2.0 has been released]**

It's been a long time since [I introduced Middleman on this blog] in 2009. Since then, RubyGems reports that there have been 27,518 downloads, <a href="https://github.com/middleman/middleman/contributors">several great contributors</a> to the source code and even a mention in a printed book.

I've been working hard on documentation as it was the most requested feature from the ["Future of Middleman Survey"]. I'm a developer and I'm sorry to admit that my first documentation target is the code and generated documentation. Available at: <a href="http://middlemanapp.com/">http://middlemanapp.com/</a>

I know, I need better, more tutorial-style written documentation for actual people. I'll be working on it as time permits, but I'd also love any assistance.

So, let's talk about the version 1.1. Originally, I planned to make 1.1 a simple update to use the latest features from Sass 3.1. However, as Sass took forever to actually ship, I tweaked, massaged and added a lot more stuff to the platform. Now, I'm releasing even though Sass 3.1 isn't out. <i>C'est la vie</i>. So, here's what's new:

* Now running on Sinatra 1.2
* Sass 3.1 beta & Compass 0.11 beta
* Feature/Extension API (<a href="#features">see below</a>)
* Simple YAML-based data for reusable content (<a href="#yaml">see below</a>)
* mm-build & mm-init now use Thor for templating
* Lorem Ipsum & placehold.it helpers (<a href="#lorem">see below</a>)
* mm-init templates, including HTML5 Boilerplate (<a href="#boilerplate">see below</a>)
* Built-in Rack config.ru for easy running on Heroku or under Pow (see below)
* Experimental JRuby support
* RubyGems-test support
* Using Bundler for packaging

READMORE

Let's take a look at some of these in depth.

<a name="features"></a>
Feature/Extension API
---------------------

All the "features" of Middleman can be enabled or disabled from your <tt>config.rb</tt> file. These features are now all using the Sinatra extension API which means it is very easy to add your own features or include features from other RubyGems. Here is an example Feature:

    # In your config.rb or an external file/gem required in config.rb
    module MyMiddlemanFeature
      class << self
        def registered(app)
          app.helpers MyMiddlemanFeature::Helpers
        end
        alias :included :registered
      end
  
      module Helpers
        def my_custom_helper
          "Hello World"
        end
      end
    end
    
    # In config.rb
    activate MyMiddlemanFeature

The above extension will add some helpers to your project. Of course, there is already the shortcut <tt>helpers</tt> block available in <tt>config.rb</tt>, but this extension could live anywhere. If you have some reusable components or business logic, you can place those in a gem, share it within your company and include it in <tt>config.rb</tt>. I use this for a custom grid-system I reuse on a lot of projects.

Of course, existing Sinatra extensions should work too. [See more here].

<a name="yaml"></a>
YAML Data API
-------------

Heavier static systems like Nanoc have a robust system for separating data from your HTML. This is great for sharing content across pages or having simpler files which content-focused co-workers can update without touching HTML. It's not documented, but because Middleman runs on Sinatra, it's possible to open database connections and pull data in that way already, but that's a bit must. Middleman 1.1 comes with a simple data API. Here's how it works:

1. Create a folder in the root of your project named <tt>data</tt>
2. Create as many <tt>.yml</tt> YAML files as you want
3. Their contents will be made available in your templates as <tt>data["filename"]</tt>

For example:

    // In PROJECT_ROOT/data/people.yml
    friends:
      - tom
      - dick
      - harry
    
    // In my template
    %h1 Friends
    %ul
      - data.people.friends.each do |f|
        %li= f
        

<a name="lorem"></a>
Lorem Ipsum & Placehold.it helpers
----------------------------------

The [Frank project], a static tool also inspired by Sinatra, has a wonderful set of helpers for generating random text content and placeholder images. I'm adapted this code for Middleman (god bless the MIT license). The API is as follows:

    lorem.sentence      # returns a single sentence
    lorem.words 5       # returns 5 individual words
    lorem.word
    lorem.paragraphs 10 # returns 10 paragraphs 
    lorem.paragraph
    lorem.date          # accepts a strftime format argument
    lorem.name
    lorem.first_name
    lorem.last_name
    lorem.email

And to use placeholder images:

    lorem.image('300x400')
    #=> http://placehold.it/300x400

    lorem.image('300x400', :background_color => '333', :color => 'fff')
    #=> http://placehold.it/300x400/333/fff

    lorem.image('300x400', :random_color => true)
    #=> http://placehold.it/300x400/f47av7/9fbc34d

    lorem.image('300x400', :text => 'blah')
    #=> http://placehold.it/300x400&text=blah

<a name="boilerplate"></a>
New Project Templates (HTML5 Boilerplate)
-----------------------------------------

I've abstracted the templates used in <tt>mm-init</tt> so that it is easy to add new ones, but right now those templates have to live in the Middleman gem to work. In the future, I'll add support for extra templates in external gems or somewhere on the local machine like <tt>~/.middleman</tt>. For now, enjoy the new template option, the wonderful [HTML5 Boilerplate]. It is used like this:

    $ mm-init my_boilerplate_project --template=html5
        create  my_boilerplate_project/config.rb
        create  my_boilerplate_project/public
        create  my_boilerplate_project/public/404.html
        create  my_boilerplate_project/public/apple-touch-icon.png
        create  my_boilerplate_project/public/crossdomain.xml
        create  my_boilerplate_project/public/css/handheld.css
        create  my_boilerplate_project/public/css/style.css
        create  my_boilerplate_project/public/favicon.ico
        create  my_boilerplate_project/public/humans.txt
        create  my_boilerplate_project/public/images/.gitignore
        create  my_boilerplate_project/public/index.html
        create  my_boilerplate_project/public/js/libs/dd_belatedpng.js
        create  my_boilerplate_project/public/js/libs/jquery-1.5.0.js
        create  my_boilerplate_project/public/js/libs/jquery-1.5.0.min.js
        create  my_boilerplate_project/public/js/libs/modernizr-1.6.min.js
        create  my_boilerplate_project/public/js/mylibs/.gitignore
        create  my_boilerplate_project/public/js/plugins.js
        create  my_boilerplate_project/public/js/script.js
        create  my_boilerplate_project/public/robots.txt
        create  my_boilerplate_project/views

Rack-support by Default
-----------------------

Finally, a very simple Rack <tt>config.ru</tt> file is included in the default template. It's contents are:

    require 'rubygems'
    require 'middleman'

    run Middleman::Server

This allows Middleman to easily run on a Heroku instance or under 37Signal's new [Pow webserver].

Installation
------------

As easy as ever:

    gem install middleman
    
Please direct all questions and bugs to Github:
<a href="https://github.com/middleman/middleman">https://github.com/middleman/middleman</a>