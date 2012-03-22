--- 
title: Example SCSS (Sassy CSS) File
date: 2010-04-09
---

[Anthony Short's CSScaffold project]: http://github.com/anthonyshort/csscaffold
[shoot me an email]: mailto:me@tdreyno.com
[SCSS]: http://nex-3.com/posts/96-scss-sass-is-a-css-extension

I'm working on a new site which will eventually run on PHP5. Going back to raw CSS isn't really an option because I value my time and sanity. Thankfully there may be a way to run Sass' new format, [SCSS], under PHP using [Anthony Short's CSScaffold project]. The project provides a CSS preprocessor, like Sass, which runs on PHP. Currently, the project's syntax is similar, but different, than either Less or SCSS. Thankfully, Anthony has said he is working on bringing CSScaffold in-line with the SCSS syntax.

Happy days! I can do the early development in Sass or SCSS using their normal Ruby library and plan for a perfect future where that same stylesheet can run unmodified on the PHP-only server. If I were a Sass diehard, I could write it all in Sass and then use the new <tt>sass-convert</tt> tool to migrate to SCSS before deployment. However, I'd actually like to give SCSS a spin so I've built out the styles in plain old SCSS. The result is include below.

If anyone has questions or would like some more clarification on the following, [shoot me an email].

An Example SCSS File
--------------------

    @import "compass";
    @import "blueprint";
    @import "blueprint/fancy_type";

    $blueprint-grid-columns:     5;
    $blueprint-grid-width:       150px;
    $blueprint-grid-margin:      20px;

    $blueprint-font-family:      Helvetica Neue, Arial, Helvetica, sans-serif;
    $blueprint-fixed-font-family:'andale mono', 'lucida console', monospace;
    $blueprint-font-size:        12px;

    $text-color:                 #555555;
    $light-text-color:           #a0a0a0;
    $quote-text-color:           #f27a00;
    $disclosure-text-color:      #ed7c06;

    $thick-border:               8px solid black;
    $dotted-border:              1px dotted #999999;

    $header-background-color:    #f07c05;
    $paging-background-color:    black;
    $unfocused-background-color: #f1f0ec;
    $quote-background-color:     #f1f0ec;

    $story-title-color:          #f07c05;

    @include global-reset;
    @include blueprint-typography;

    body {
      background: $unfocused-background-color image_url("white-bg.jpg") repeat-y 50% 0;
      color: $text-color;
    }

    .content_wrapper {
      @include container;
      width: 910px;
    }

    #header {
      height: 72px;
      background: $header-background-color;
      @include clearfix;
      
      h1 {
        color: white;
        @include float-left;
        a {
          @include replace-text("logo.jpg");
          width: 116px;
          height: 72px;
          display: block;
          text-decoration: none;
        }
      }
      
      ul {
        @include horizontal-list; 
        padding: 0 0 0 25px;
        li {
          @include incr(18px);
          padding: 0 20px 0 0;
          text-transform: uppercase;
          a { 
            color: #febf0f;
            text-decoration: none;
            width: 100px;
            height: 72px;
            display: block;
          }
          &#header-threads a {
            @include replace-text("header-threads-text.jpg");
          }
          &#header-timeline a {
            @include replace-text("header-timeline-text.jpg");
          }
        }
      } 
    }

    #paging {
      background: $paging-background-color;
      height: 33px;
      padding: 15px 0 0 0;

      h6 {
        @include float-left;
        color: #908f8b;
        padding-right: 20px;
        text-transform: uppercase;
        a { 
          color: #f07b07; 
          text-decoration: none;
        }
      }
      
      ul {
        @include horizontal-list;
        li {
          padding: 3px 4px;
          a { 
            color: #4c4c4c;
            @include replace-text("thread-paging-inactive-bullet.jpg");
            width: 10px;
            height: 10px;
            display: block;
          }
          &.active a { 
            color: #f17d06;
            background-image: image_@import "compass";
          }
        } 
      }
    }

    #content {
    	position: relative;
    	#previous {
    	  position: absolute;
    	  top: 0;
    	  left: 0;
    	  text-align: right;
    	}
    	#next {
    	  position: absolute;
    	  top: 0;
    	  right: 0;
    	  text-align: left;
    	}
    }

    #thread {
    	@include container;
      width: 910px;
    	top: 0px;
    	left: 0px;
    	
    	@include transition-property(left);
    	@include transition-duration(0.5s);
    	@include transition-timing-function(ease-in-out);
    	
    	@for $i from 0 through 30 {
      	&.position#{$i} {
      	  left: ($i * -910px); 
      	}
      }
    }

    .js {
      #content {
      	overflow: hidden;
        width: 100%;
      }

      #thread { 
      	padding: 0;
      	width: 5000px;
      	position: absolute;
      }
    }

    .story {
      @include float-left;
      width: 810px;
      padding: 0 50px;
      
      h4.date {
        @include float-right;
        @include span(1);
        background: $unfocused-background-color;
        padding: 10px 20px;
        @include border-radius(3px);
      }
      
      h1 {
        padding: 40px 0 20px 0;
        border-bottom: $thick-border;
        color: $story-title-color;
        @include incr(30px);
      }
      
      .artifacts {
        @include column(3);
        
        .row {
          @include clearfix;
          border-bottom: $dotted-border;
          margin-bottom: $blueprint-grid-margin;
        }
        
        .artifact {
          color: $light-text-color;
          img {
            margin-bottom: 0.5em;
          }
          a {
            font-weight: bold;
            text-decoration: none;
            color: #0a83e0;
          }
        }
        
        .threecol { @include column(3); }
        .twocol   { @include column(2); }
        .onecol   { @include column(1); }
        .last     { @include last;      }
      }
      
      .information {
        @include column(1.6, true);
        border-bottom: $dotted-border;
        margin-left: 40px;
        
        h2 {
          @include incr(20px, $blueprint-font-size, 35px);
        }
        
        .textblock p {
          @include incr(13px, $blueprint-font-size, 26px);
        }
        
        .quote {
          color: $quote-text-color;
          blockquote {
            @include incr(18px, $blueprint-font-size, 30px);
            color: $quote-text-color;
            margin: 0;
            padding: 12px 18px;
            background: $quote-background-color;
            @include border-radius(5px);
          }
          cite {
            display: block;
            padding: 0.5em 18px 1.5em 18px;
          }
        }
        
        .disclosure {
          border-top: $dotted-border;
          h5 {
            padding: 10px 0;
            margin: 0;
            color: $disclosure-text-color;
          }
          p {
            color: #a8a8a8;
          }
        }
      }
    }

    #footer {
      @include container;
      background: white;
      width: 810px;
      padding: $blueprint-grid-margin 0;
      
      .inner {
        border-top: $thick-border;
        padding: 30px 0;
      }
      
      p {
        @include float-right;
        @include incr(10px);
        color: #b3b3b3;
      }
      
      ul {
        @include horizontal-list; 
      
        li {
          padding: 0 30px 0 0;
          a { 
            text-decoration: none;
            color: #ef7a06; 
          }
        } 
      }
    }
