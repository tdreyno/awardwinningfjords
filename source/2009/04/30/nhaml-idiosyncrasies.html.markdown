---
title: NHaml idiosyncrasies
slug: nhaml-idiosyncrasies
date: 2009-04-30
---

[NHaml]: http://code.google.com/p/nhaml/

[NHaml] is an implementation of Haml for the .NET runtime. Specifically it runs inside .NET's new MVC architecture. This implementation is missing quite a few Haml niceties and the language has actually been altered in many places to be more C#-like. Personally, I think this is a poor decision. Imagine if Javascript had different syntax depending on the browser it was running in? Well... I guess Microsoft has JScript and VBScript so maybe this is just how Windows programmers operate. But, I digress. Here are some gotchas should you contemplate using NHaml.

Instead of Ruby hashes, parameters are C# Key-Value pairs
---------------------------------------------------------

This means Ruby's symbols (prefixed with a colon) are now just plain keys. Similarly, the hashrocket (=&gt;) becomes a normal equals sign

    Before: %link{ :type => "text/css", :rel => "stylesheet", :src => "style.css" }
    After:  %link{ type="text/css", rel="stylesheet", src="style.css" }

**[Edit: As of NHaml 2.0 beta 2, the syntax for attributes has changed and now appears exactly like normal HTML attributes (no commas are used). The above code would now be written is as follows:]**

    %link{ type="text/css" rel="stylesheet" src="style.css" }

Single-quotes are not allowed
-----------------------------

C# apparently uses single-quotes to denote a character, not a string.

    Before: %input{ :type => 'text' }
    After:  %input{ type="text" }

Lines cannot be started with an ampersand (&amp;) character
-----------------------------------------------------------

NHaml has a special meaning for lines like this. Apparently it is for automatically escaping the contents of that line. You will need to escape the ampersand:

    Before: &ldquo;Hi&rdquo;
    After:  \&ldquo;Hi&rdquo;

NHaml HATES white-space-only lines
----------------------------------

Basically, if you're using empty lines to space out your code, NHaml requires that they contain as much indentation as the section they are supposed to be a part of or else they will clear out your nesting.

Given the following Haml

    %ul
      %li
        Text

      %li
        Text2

NHaml will render this as:

    <ul>
      <li>
        Text
      </li>
    </ul>
    <li>
      Text2
    </li>

So remember to remove white-space-only lines until this issue is resolved.

Conclusion
----------

All in all, I'm still really happy to be able to use Haml in the .NET environment. It took me 5 hours yesterday to build a relatively complicated 20-page site in Haml. Today it took me 8 hours to get it working in NHaml, but this is a one-time penalty. Next time I can write my Haml with NHaml in mind.

I want to say thanks to the NHaml team. I hope the project is a success because it still needs some love and I would really like Sass support. I kind of feel sorry for C# programmers. The culture doesn't flock to open source like it does in the open source languages (Python, Ruby, etc). There seem to be fewer C# developers who live in HTML and are interested improving the front-end side of the .NET stack. However, it looks like things are improving.