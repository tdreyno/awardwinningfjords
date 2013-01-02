---
title: Refactoring with Sass
slug: refactoring-with-sass
date: 2009-03-14
blog_editor_id: 89
---

I had intended to jump right into Compass modules and user-defined "functions," but that's a rather high-level concept and requires a relatively strong understanding of Sass which I shouldn't assume readers have because Sass isn't really that popular. I'll save the complicated stuff for the next article. Instead, I'll look at how you can take an existing CSS document and convert to Sass in preparation for the article on more-complicated techniques.

Converting CSS to Sass
----------------------
There are two ways to convert an existing CSS file to Sass. The Haml gem comes with a command called css2sass which parses your CSS document, converts it to Sass-styled code and nests the selectors hierarchically to reduce repetition. You can run the conversion and save the output to a new file by running:

    css2sass OLDFILE.css > NEWFILE.sass

However, there is one large caveat. Because css2sass rearranges your selectors, you can run into problems with specificity and order. If you have been working quickly and not refactoring as you were developing  (aka doing real work), then you may have begun littering your CSS with more and more one-off commands that altered css defined earlier in the document. They "worked" because css overrides styles as it reads through the document. The sass produced by css2sass may have a different order and can cause your little tweaks to be ignored.

The safer alternative is to convert from CSS to Sass by hand. Simply remove all curly braces and semicolons and you should have a valid—if not optimized—Sass document. If you've been inconsistent with using either tabs or spaces, Sass will warn you. You'll need to standardize on one or the other before moving forward. If you start out with some CSS like this:

    #left {
      float: left;
      display: inline;
      width: 242px;
    }
    #left ul {
      list-style-type: none;
      margin: 0 8px 0 0;
    }
    #left ul li {
      font-size: 13px;
    }

The first-pass of conversion to Sass will now look like:

    #left
      float: left
      display: inline
      width: 242px
    #left ul
      list-style-type: none
      margin: 0 8px 0 0
    #left ul li
      font-size: 13px

The next step is to start at the top (#left) and try to modify the nesting so that it only appears once in the Sass file. Simply indent anything starting with #left and remove the id selector. We will also do the same with the "ul li" selector. Exchange the explicit selector for hierarchical indentation.

    #left
      float: left
      display: inline
      width: 242px
      ul
        list-style-type: none
        margin: 0 8px 0 0
        li
          font-size: 13px

So far, all we've done is removed some punctuation and a little duplication. If we ever need to change the id selector, we can do it in one place and all the nested styles beneath it will automatically be updated thanks to Sass. Personally, this simple improvement was enough to get me to convert to Sass full-time.

In the next article, I'll look at the included modules in Compass that we can use to reduce code duplication and save time. Once we see why such modules are useful, we'll take a look at how to define our own.