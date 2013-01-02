---
title: Using RVM to Manage Multiple Ruby Interpreters
date: 2010-02-17
blog_editor_id: 70
---

[Ruby Version Manager]: http://rvm.beginrescueend.com/rvm/install/
[Middleman]:            http://middlemanapp.com

I've been hearing a bit of buzz about the [Ruby Version Manager] project on Twitter and from other Rubyists I know. Basically, the project provides a command-line tool which can download and compile a large number of Ruby implementations and swap between the active implementation on a per-terminal basis.

This is especially useful for me as I have Ruby tools, like [Middleman], which I need to maintain on multiple VMs. In the past, you'd have to install each VM to it's own namespace and be very careful when running them to make sure you were in the right VM. For example:

    ruby: The default OSX ruby 1.8.7
    ruby19: My custom-compiled ruby 1.9.1
    jruby: My custom-compiled jRuby
    macruby: My custom-compiled MacRuby

RVM makes managing these interpreters a snap. So here's how you get started.

Install the gem
---------------

    gem install rvm

Run the installer
-----------------

    rvm-install

Follow instructions and append the output of the install to your terminal profile

    In ~/.profile
    Add to the bottom:
    
    if [[ -s /Users/tdreyno/.rvm/scripts/rvm ]] ; then source /Users/tdreyno/.rvm/scripts/rvm ; fi

Then, save and close ~/.profile and run:

    source ~/.profile
    
Now, you are ready to go.

Commands
--------

First, lets see which Ruby VMs the tool detected.

    rvm list

My output includes the built-in OSX VM.

    System Ruby

       system [ x86_64 i386 ppc ]

Now, I want to install some more Rubies.

    rvm install 1.9.1,rbx,jruby,macruby

A couple of minutes later, you'll have 5 different Ruby VMs installed. RBX is Rubinius and the others should be self-explanatory.

Swapping VMs
------------

To change between the active VM, simply run:

    rvm use 1.9.1

And now `ruby -v` returns "ruby 1.9.1p378 (2010-01-10 revision 26273) [i386-darwin10.2.0]"

In my case, I can now run my Cucumber tests against my library and verify that it's working with Ruby 1.9.1.

To return to your original VM, run:

    rvm use system
    
Be aware that each VM probably has it's own gems. So you'll need to be aware of that and try to keep each VM's gems in sync.