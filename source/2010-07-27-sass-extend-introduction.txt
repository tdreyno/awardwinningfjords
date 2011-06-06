--- 
title: Sass @extend Introduction
date: 27/07/2010

Sass (and SCSS) version 3 added support for the @extend directive which provides a means of class inheritance and combats the duplication of CSS which Sass mixins create. The earlier features of Sass were basically macros. They grabbed a piece of CSS from either a mixin definition or an external file and inserted that CSS into the output. @extend actually manipulates the selectors and uses CSS's own cascading inheritance system simplify code and avoid duplication. Let's look at some simple examples.

Multiple Sidebars and Fighting Class-itis
-----------------------------------------

Imagine you have a sidebar with 3 boxes. The first box is logging in, the second box is for an already logged in user and the third box is simply a series of links (a tag cloud, maybe). All three boxes should be styled similarly so let's start with the basics:

    .sidebar-box
      +clearfix
      margin: 0 0 10px 0
      background: #eee
      +border-radius
      padding: 10px

Now, any <tt>div</tt> element we assign a class of <tt>sidebar-box</tt> will be cleared, have a bottom margin, a background color, rounded-corners and an internal padding. Now let's develop a login/logout box which has some specifics for form controls.

    .sidebar-auth-box
      @extend .sidebar-box
      input[type=text]
        padding: 10px
        border: 1px solid #ccc

Now, any <tt>div</tt> element we assign a class of <tt>sidebar-auth-box</tt> will behave identically to the standard <tt>sidebar-box</tt>, but will also have custom styling for form inputs. Finally, the logout box will be a darker color to help it stand out. Before @extend, we might have ended up with a tag like this: 

    <div id="logout-box" class="sidebar-box sidebar-auth-box">

Now, we can keep our HTML simple and continue with another @extend:

    #login-box
      @extend .sidebar-auth-box
    #logout-box
      @extend .sidebar-auth-box
      background: #bbb
    #links-box
      @extend .sidebar-box

This requires only an <tt>id</tt> on the three boxes, but we don't repeat ourselves. You'll also notice that the plain CSS classes are still available to place on <tt>div</tt> elements for rapid development or if custom id attributes are not needed. For those who are curious what the output looks like, here it is: 

    :::CSS
    .sidebar-box, 
    .sidebar-auth-box, 
    #login-box, 
    #logout-box, 
    #links-box {
      overflow: hidden;
      display: inline-block;
      margin: 0 0 10px 0;
      background: #eeeeee;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      -o-border-radius: 5px;
      -ms-border-radius: 5px;
      -khtml-border-radius: 5px;
      border-radius: 5px;
      padding: 10px; }
      .sidebar-box, 
      .sidebar-auth-box, 
      #login-box, 
      #logout-box, 
      #links-box {
        display: block; }

    .sidebar-auth-box input[type=text], 
    #login-box input[type=text], 
    #logout-box input[type=text] {
      padding: 10px;
      border: 1px solid #cccccc; }

    #logout-box {
      background: #bbbbbb; }
