---
title: Compass, the future of Sass development
slug: compass-the-future-of-sass-development
date: 2009/03/11
---

[peepcode-haml]: http://peepcode.com/products/haml-and-sass
[chris-github]:  http://github.com/chriseppstein
[blueprint]:     http://www.blueprintcss.org/
[960]:           http://960.gs/
[yui]:           http://developer.yahoo.com/yui/grids/
[haml]:          http://github.com/nex3/haml/tarball/master
[clearfix]:      http://www.positioniseverything.net/easyclearing.html
[image-replace]: http://phark.typepad.com/phark/2003/08/accessible_imag.html
[nhaml]:         http://andrewpeters.net/2007/12/19/introducing-nhaml-an-aspnet-mvc-view-engine/

I've been a fan of Haml and Sass for a long time. Ever since I ran my mouth in #merb and Hampton Caitlin rightfully put me in my place. If you have no clue what Haml &amp; Sass are—or if you've heard the buzz, but never actually checked them out—you can view [this excellent PeepCode screencast on the subject][peepcode-haml]. I currently use both for the initial coding of all the sites I develop. However, I am not lucky enough to work with a Haml-enabled framework on the backend like Rails or Merb so I have to compile to HTML and CSS when I begin integrating the front-end with the back-end¹.

This situation sucks. Sass makes me a faster in my initial development, but it also speeds up tweaking small site-wide issues and overall maintenance. I develop my Sass modularly and try to use variables for site-wide colors, border and fonts. Wouldn't it be great if I could use Sass throughout the entire development cycle?

Enter Compass
-------------
Compass is a new Sass-centric library from [Chris Eppstein][chris-github]. 
There are two components of Compass. The first is a handful of libraries and code snippets implemented in Sass so you can easily apply the rules of [Blueprint][blueprint], [960.gs][960] or [YUI grids][yui] to you website entirely in Sass without dirtying up your HTML with presentational classes. The second component is the compass command-line tool which continuously watches you Sass files and compiles them to CSS on-the-fly. While I do am a huge fan of grid-based design and I do appreciate the implemented CSS grid systems, I usually code each site from scratch rather than rely on someone else's large CSS library. Therefore this article will focus on getting Compass installed and using it to generate CSS on-the-fly.

Getting Started
---------------
This will download, compile and install the Haml gem. The next step is making sure RubyGems is new enough to play nicely with GitHub-hosted gems. Then we'll be able to install compass from GitHub. From the terminal run:

    sudo gem update --system
    sudo gem install compass

Continuous Compilation
----------------------
Alright, let's move to our web directory—wherever that may be. I like to keep all my CSS and Sass together so I have a base css/ directory and css/sass/ directory under that. Given that structure, I can have compass watch my Sass like so:

    cd PROJECT_DIR
    compass --watch --css-dir css --sass-dir css/sass

Compass will sit patiently in the terminal, monitoring the folder I specified and compiling the Sass files to CSS whenever I save an existing file or add a new one. In my next article, I will discuss converting existing CSS files to Sass, the refactoring process and the usage of compass' included Sass modules for common CSS such as the [clearfix hack][clearfix] and [Mike Rundle's image replacement][image-replace].

- - - - - - 

¹ Luckily for me, Microsoft's [ASP.NET will soon have access to HAML][nhaml] via the MVC Contribs project. Alas, no native Sass support is on the horizon.