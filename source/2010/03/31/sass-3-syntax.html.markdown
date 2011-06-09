--- 
title: Sass 3 Syntax
date: 31/03/2010
---

[Sass 3 Changelog]: http://beta.sass-lang.com/docs/yardoc/file.SASS_CHANGELOG.html#3-0-0-syntax-changes
[Chris Eppstein]: http://twitter.com/chriseppstein
[Compass]: http://compass-style.org/
[Susy]: http://www.oddbird.net/susy/

**Edit: Added section on hyphens and underscores as requested by [Chris Eppstein]**

Today a beta for Sass 3 was released. It comes with some interesting new syntax options so let's get it installed and dive into the new syntax and directives.

Installation
------------

Go ahead and grab the Sass 3 prerelease by running:

    gem install haml --pre
    
Converting Old Sass Files to New Syntax
---------------------------------------

The old <tt>css2sass</tt> command line tool has been replaced with <tt>sass-convert</tt>. Like the old tool, <tt>sass-convert</tt> can change css files into sass files. It can also convert css files to the new, optional, scss format. Finally, it can convert between scss and sass as well as upgrading old sass files to the new syntax.

Converting from Sass 2 to Sass 3 is as easy as:

    sass-convert --in-place --from sass2 style.sass

There is also a <tt>--to</tt> flag which Sass 3 is the default. You could also convert <tt>--to scss</tt> if you wanted to experiment with that format.

New Syntax #1: No more equals signs
-----------------------------------

In Sass 2, lines which required parsing, contained functions or math had to begin with an equals sign instead of the normal CSS colon. Sass 3 has removed this requirement and we can all go back to using a colon for separating a style directive and it's value in CSS, Sass 3 or SCSS.

Before:

    body
      background= image_url("background.png")

After:

    body
      background: image_url("background.png")
  
New Syntax #2: Variable prefix
------------------------------

Formerly, the way Sass defined variables was using the exclamation point prefix. However, since the exclamation point is already used in CSS (with the !important directive) it always felt a little strange to use the same symbol in two different contexts. In Sass 3, variables are now defined with the dollar sign prefix similar to PHP.

Before:

    !background_color= #ffffff

After:

    $background_color: #ffffff

One nice side effect of this change is the ability to mix quoted and unquoted strings on the same line. Something I do often for font declarations and now I no longer need to wrap the whole section in an additional level of quotes.

Before:

    !font_family= "'Lucida Sans', 'Lucida Grande', arial, sans-serif"
  
After:

    $font_family: 'Lucida Sans', 'Lucida Grande', arial, sans-serif
    
New Syntax #3: Default variable values
--------------------------------------

Variable assignment used to use the ||= syntax from Ruby to only update a variable when it did not already exist. However, since the equals sign is no longer used in Sass 3, there is now a new, more CSS-like syntax for conditionally assigning a variable. Sass 3 uses a directive similar to !important, called !default, which is placed at the end of the assignment.

Before:

    !font_size ||= 12px
    
After:

    $font_size: 12px !default

New Syntax #4: Interchangeable underscores and hyphens
------------------------------------------------------

In the past, variables in Sass would only work with underscores used to separate the different "parts" of the variable name. This format is very Ruby-like, but I personally prefer to use hyphens in my CSS. Sass 3 allows both underscores and hyphens to be used, but there is an interesting twist. Sass 3 will allow their use interchangeably. If the variable is defined with underscores, it can still be called with hyphens. This should save some frustration for those using a Sass framework like [Compass] or [Susy]. You can use whichever form you want and Sass will find the correct variable.

Before:

    !body_background_color= #000000
    
    body
      background= !body_background_color

After (either will work):

    $body_background_color: #000000
    $text-color: #ffffff
    
    body
      background: $body-background-color
      background: $body_background_color
      color: $text-color
      color: $text_color

Conclusion
----------

That's all for now. There are several other nice features in Sass 3 such as the integration of compass-colors, a new mixin definition and inclusion syntax and the SCSS syntax. You can read about these in the [Sass 3 Changelog]. I may write about SCSS later, but I'm not a huge fan and will probably wait and let someone who has a bigger stake in the issue (those using LESS or those who adore single-line CSS) address it. 