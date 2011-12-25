--- 
title: Style Guides Using Sass @extend
date: 07/30/2010
---

There are some very common front-end development patterns that drive me crazy. CSS with every style related to a specific selector on one line and IE-only stylesheets with conditional comments are both common place and even encouraged by some. But the worst, in my opinion, is breaking our CSS into multiple files in an attempt to make them "themable." Usually this results in something like a <tt>main.css</tt> and a <tt>fonts.css</tt> or <tt>colors.css</tt>. Having a go-to file for designers to manipulate fonts and colors is very useful, but usually the structure of this secondary file mirrors the primary file and you end up with a lot of repetition. Furthermore, if your DOM structure changes, then you will need to update multiple files (<tt>ie.css</tt> results in a similar problem).

Sass' @extend feature allows us to have a <tt>style-guide.sass</tt> in which designers can run free, but is not dependent on DOM structure. Let's take a look at how I setup my style guides.

The Style Guide
---------------

The designer on the project has put together a wonderful style guide PDF which I will be implementing in Sass. Here is what it looks like:

<img src="http://src.sencha.io/-30/http://awardwinningfjords.com/images/style-guide-full.png" />

As you can see, each style has a title and some specifics for the text treatment.

First I setup variables for our color palatte.

    $primary-orange:   #fe8a16
    $hover-orange:     #f67502
    $steel-blue:       #303b41 
    $bright-blue:      #4892bc
    $dark-grey:        #4b4b48

Next I create some simple mixins to handle usage of custom fonts.

    =custom-font
      font-family: "Droid Sans"
      font-weight: normal
      
    =bold-custom-font
      font-family: "Droid Sans Bold"
      font-weight: bold

Finally, I start defining the styles as classes. As you can see, I am using @extend to avoid repeating myself. I'm going to omit some of the styles in the guide for the sake of brevity.

    .sg-heading-1
      +custom-font
      font-size: 32px
      line-height: 36px
      color: $steel-blue

    .sg-heading-2
      @extend .sg-heading-1
      font-size: 20px
      line-height: 28px

    .sg-heading-3
      @extend .sg-heading-2
      color: $bright-blue

    .sg-main-body
      font-size: 14px
      line-height: 24px
      font-weight: normal
      color: $dark-grey

    .sg-secondary-body
      @extend .sg-main-body
      font-size: 12px
      line-height: 18px

    .sg-text-link-1
      font-weight: normal
      color: $primary-orange
      text-decoration: none
      &:hover
        color: $hover-orange

Referencing the Style Guide
---------------------------

Now, when I go to implement a specific portion of the site, I can be concise by referencing the style guide. 

    .info-box
      h2
        @extend .sg-heading-2
      ul li
        @extend .sg-text-link-1
      p
        @extend .sg-main-body
      dl
        @extend .sg-secondary-body

Here's the resulting CSS output:

    :::css
    .sg-heading-1, .sg-heading-2, .sg-heading-3, .info-box h2 {
      font-family: "Droid Sans";
      font-weight: normal;
      font-size: 32px;
      line-height: 36px;
      color: #303b41; }

    .sg-heading-2, .sg-heading-3, .info-box h2 {
      font-size: 20px;
      line-height: 28px; }

    .sg-heading-3 {
      color: #4892bc; }

    .sg-main-body, .sg-secondary-body, .info-box dl, .info-box p {
      font-size: 14px;
      line-height: 24px;
      font-weight: normal;
      color: #4b4b48; }

    .sg-secondary-body, .info-box dl {
      font-size: 12px;
      line-height: 18px; }

    .sg-text-link-1, .info-box ul li {
      font-weight: normal;
      color: #fe8a16;
      text-decoration: none; }
      .sg-text-link-1:hover, .info-box ul li:hover {
        color: #f67502; }

Conclusion
----------

I have been incredibly happy with this approach. It has all the independence of the external <tt>fonts-and-colors.css</tt> method, but is more flexible, uses less code and is more readable in both the Sass and CSS forms.

I highly suggest getting your designer to build a style guide. It enforces consistency and keeps the randomness out of coding. Why should a site use every font size between 12px and 22px? Just pick a few sizes and standardize on them.
