---
title: Sass 3 Color Manipulation
date: 2010-04-12
blog_editor_id: 66
---

[Powerful Color Manipulation with Sass]:          http://nex-3.com/posts/89-powerful-color-manipulation-with-sass
[Brandon Mathis' fantastic Fancy Button library]: http://brandonmathis.com/projects/fancy-buttons/demo/
[Susy's]:                                         http://www.oddbird.net/susy/
[Compass core contributors]:                      http://chriseppstein.github.com/blog/2010/04/11/compass-core-team/

I was going to write about the Compass Colors plugin merging into Sass 3, but it looks like Sass-maintainer Nathan Weizenbaum has already written a great article about it.

Read about [Powerful Color Manipulation with Sass] on his blog.

Just for kicks, here is a relavant portion of Sass colors that I use on this blog:

    $font-color:         darken(#4e4c49, 5)
    $darker-font-color:  #4e4c49
    $header-color:       darken($font-color, 10)
    $border-color:       #d0d0d0
    $link-color:         #af512c
          
    #social
      color: lighten($font-color, 40)
      
    #footer
      background: darken(#603d17, 5)
    
These functions are also used in [Brandon Mathis' fantastic Fancy Button library]. Brandon and [Susy's] Eric Meyer are both [Compass core contributors] now. Congratulations to both and thanks for all the fantastic code.
