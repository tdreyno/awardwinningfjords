title: Don't repeat yourself, use Sass mixins
slug: dont-repeat-yourself-use-sass-modules
date: 2009/04/02

There are quite a few situations in CSS where you are simply copy &amp; pasting the same set of styles in multiple places. If at some point, you want to tweak these styles, you'll need to track down and update each set of styles. Sass introduces the concept of mixins which are blocks of nested Sass code which can be applied to any selector in your Sass document. Think of them as variables which can hold multiple levels of information. The syntax for defining a module is simple:

    =module-name
      style1: value1
      style2: value2
      .wrapper
        style3: value3
  
Then you can inject this module into a selector:

    #frame #left
      +module-name

Which will generate CSS that looks like this:

    #frame #left {
      style1: value1;
      style2: value2; }
      #frame #left .wrapper {
        style3: value3; }

In my opinion, this is Sass' killer feature. The repetition so common in large CSS files can be extracted into reusable functions. To illustrate this point, I'm going to take two of the most-frequently repeated blocks of CSS: the clearfix and the replacement of text with an image.

Clearfix
--------
The Sass definition for clearfix—pulled from the Compass project—is declared as such:

    =clearfix
      :overflow auto
      :overflow -moz-scrollbars-none
      // This makes ie6 get layout
      :display inline-block
      // and this puts it back to block
      &amp;
        :display block

Many developers create a .clearfix class and apply it on the HTML-side to blocks which need the hack. I've never been a huge fan of this as you are making presentational changes to the content-side of the equation. The old-school .clearfix class can be accomplished pretty simply though, so it is worth showing:

    .clearfix
      +clearfix
    
On the other hand, I prefer to include the clearfix directly on the selectors that need it:

    #left
      +clearfix
      div
        float: left

And since this is a new concept, here is the CSS which will be generated:

    #left {
      overflow: auto;
      overflow: -moz-scrollbars-none;
      display: inline-block; }
    #left {
      display: block; }
      #left div {
        float: left; }

This actually results in a lot of duplication in the <em>rendered</em> CSS over the .clearfix method. I guess it depends what you want to optimize your development for. If you develop entirely in Sass, then it is a non-issue. However, if you generate CSS and hand it over to a client or another developer, they may not like this kind of repetition.

Module parameters
-----------------
Sass mixins can also take parameters that are used when generating the CSS. Here is the Sass definition for the often-used trick of displaying an image behind text (usually a H1-H6 tag) and shifting the text out of view.

    =replace-text( !img, !x = 50%, !y = 50% )
      :text-indent -9999em
      :overflow    hidden
      :background
        :image= url(!img)
        :repeat no-repeat
        :position= !x !y

As you can see, we must pass in the location of the replacement image and optionally the background position. The simplest usage of this module looks something like this:

    #header h1
      +replace-text("/images/welcome.jpg")

And for completeness, here is the generated CSS:

    #header h1 {
      text-indent: -9999em;
      overflow: hidden;
      background-image: url("/images/welcome.jpg");
      background-repeat: no-repeat;
      background-position: 50% 50%; }
    
Mixin libraries
---------------
In the next article, I'll go through a number of Sass mixins which are distributed with the Compass project.