--- 
title: Mustache for JavascriptMVC 3
date: 09/08/2010

[the Github repository]: http://github.com/tdreyno/mustache-javascriptmvc

If you're a fan of the Mustache templating language, here's a plugin to integrate it with JavascriptMVC 3.

There are two ways of grabbing the code. If you have a very recent version of JavascriptMVC 3 you can use the new <tt>getjs</tt> method of installing plugins. The command, from your project folder, looks like this:

    ./steal/js steal/getjs mustache

Alternatively, you can grab the code from [the Github repository]:

    git clone git://github.com/tdreyno/mustache-javascriptmvc.git mustache

Include it in your app:

    :::JavaScript
    steal.plugins("mustache")

Create some <tt>.mustache</tt> files and use them normally:

    :::JavaScript
    $("#elem").html("//views/template.mustache", { variable: "Value" })
