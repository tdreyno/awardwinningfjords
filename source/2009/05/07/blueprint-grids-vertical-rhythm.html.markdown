---
title: Using Compass to implement the Blueprint grid-system &amp; consistent vertical-rhythm
slug: blueprint-grids-vertical-rhythm
date: 2009-05-07
---

Using Sass &amp; Compass I updated the css on this site to use Blueprint's 950px grid system and their typography for consistent vertical rhythm. 
The full Sass is included below:

    @import base.sass

    body
      background: #F9F3E8

    a
      font-weight: bold

    h1, h2, h3
      font-family= !header_font_family
      font-weight: 200
      a
        text-decoration: none
        color= !header_color
        font-weight: 200
    h1
      margin-top: 0
      background= image_url("title-embellishment.gif") "no-repeat" 17px 7px
    h2
      margin: 1.5em 0 0 0

    hr
      +colruler
      color= !border_color
      background= !border_color

    #header
      height: 108px
      background: #6B4419
      h2
        height: 108px
        +replace-text("header.gif")
        +link-fills-element
      p
        display: none

    #post
      +container(790px)
      padding-top= (!baseline * 2)
      h1, h2, p, blockquote, ul, ol, pre
        +prepend(2)
        +append(2)
      hr
        margin-left: 80px
        +span(16)
      blockquote
        color: #592E08
        font-family= !quote_font_family
        background= image_url("quote.gif") "no-repeat"
      strong
        color= !darker_font_color
      pre
        color= !darker_font_color
        background= #F2EADD image_url("code.gif") "no-repeat"
        overflow: visible
        padding-top: 1.5em
        padding-bottom: 1.5em
        strong
          font-weight: normal
          color: #000

    .blurb-set
      +container(630px)
      +prepend(2)
      +append(2)
      .post-blurb
        +column(8)
        width: 290px
        padding= !baseline 20px !baseline 0
        h3
          margin-top: 0
      .last
        +last
        padding-right: 0 !important

    #comments
      +container(790px)
      padding-top: 1.5em
      h2
        color: #543616
        border-bottom= 3px "solid" !border_color
        +prepend(2)
        margin= 0 0 (!baseline - 3px) 0
        span
          height= (!baseline * 2)
          overflow: hidden
          display: inline
          font-weight: bold
          font-family: 'Helvetica Neue', arial, sans-serif
          color: #fff
          padding: 0 10px
          -webkit-border-radius: 0.5em
          -moz-border-radius: 0.5em
          background: #AF512C
      ul
        +no-bullets
        margin: 0 0 3em 0
        padding: 0
        li
          +prepend(2)
          +append(2)
          padding-top: 1.5em
          padding-bottom: 1.5em
          background= image_url("quote-odd.gif") "no-repeat" 0 -23px
          cite
            font-weight: bold
            font-style: normal
            color: #AF512C
          &amp;.odd
            background= #F2EADD image_url("quote-even.gif") "no-repeat" 0 -23px
          &amp;.comment-author-admin
            background= #8F704E image_url("quote-myself.gif") "no-repeat" 0 -23px
            cite
              color: #fff
            p
              color: #D2C6B8

    #footer
      text-align: left
      .wrapper
        +container(630px)

      #copyright
        background: #603D17
        padding-top: 1.5em
        padding-bottom: 1.5em
        +clearfix
        p
          color: #B09E8B
          margin: 0
          a
            color: #B09E8B
            font-weight: normal
          &amp;.left
            +float-left
          &amp;.right
            +float-right

      #reply
        margin-top: 1.5em
        background: #f2eadd
        h2
          color= !darker_font_color
          margin-top: 0.75em

        .text input,
        .textarea textarea
          outline: 0
          border: 2px solid #D3CBBD
          -webkit-border-radius: 0.5em
          -moz-border-radius: 0.5em
          background: #fff
          font-size: 1em
          font-family= !blueprint_font_family
          &amp;.example
            color: #999

        .text
          height= (!baseline * 2)
          input
            padding: 4px 6px
            width: 305px

        .textarea
          height= (!baseline * 10)
          textarea
            padding: 6px 4px
            width: 618px
            height: 150px

        .submit
          height= (!baseline * 2)