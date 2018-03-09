---
title: My Weird Ruby
tags: ruby
---

Over the past year, I've been rewriting large portions of the Middleman codebase to better reflect how I like to write code (as opposed to the silly version of me who did the original version 6 years ago). I've learned a lot since then, spent pretty much every day writing mostly Javascript and trying to find any excuse to play with Clojure. As a result, my form of Ruby looks pretty strange these days.

Here's a representative piece of code from Middleman v4:

	# The standard "record" that contains information about a file on disk.
	SourceFile = Struct.new :relative_path, :full_path,
							:directory, :types
	
	# Find a file given a type and path.
	#
	# @param [Symbol] type The file "type".
	# @param [String] path The file path.
	# @param [Boolean] glob If the path contains wildcard or glob.
	# @return [Middleman::SourceFile, nil]
	Contract Symbol, String, Maybe[Bool] => Maybe[SourceFile]
	def find(type, path, glob=false)
	  watchers
	    .lazy
	    .select { |d| d.type == type }
	    .map { |d| d.find(path, glob) }
	    .reject(&:nil?)
	    .first
	end

Let's talk about some unfamiliar patterns.

## Records

A Record, represented as a `Struct` in Ruby, is simply a Hash which has pre-defined its keys. This allows you to treat data that represents some item in a predictable way rather than constantly checking for keys or creating a Class which "models" the data.

	# The standard "record" that contains information about a file on disk.
	SourceFile = Struct.new :relative_path, :full_path,
							:directory, :types

These days, I'm not a big fan of Classes or inheritance, so the idea of attaching methods to a Class that only works in one context is not appealing. When I use a Record instead, I just get pure data, which is well named, and my methods can either pretend it is a normal Hash or ask if it's a `SourceFile` and do something special.

## Laziness & Chaining

Chaining provides a nice, readable way of describing how data is transformed. The only downside is that iterating over large datasets, just to find one element, is slow. That's where laziness comes in. In ruby, we can call `.lazy` on an array, then when we iterate it does to lazily. In the following code, `.first` will run once select has found 1 item, which mapped to a non-nil value, rather than looping over the entire list 3 times (once for `select`, `map` and `reject`).
	
	watchers
	  .lazy
	  .select { |d| d.type == type }
	  .map { |d| d.find(path, glob) }
	  .reject(&:nil?)
	  .first

## Design by Contract

The Ruby `contracts` gem adds the ability to decorate methods with code that checks that the inputs and the output match what the contract specifies. This is a simple, opt-in way of adding some type checks without going down the rabbit hole of Static Typing everything. At some point, `contracts` may be able to directly read the YARD doc strings (like Google's Closure and Facebook's Flow do), but for now we have to duplicate this information:

	# @param [Symbol] type The file "type".
	# @param [String] path The file path.
	# @param [Boolean] glob If the path contains wildcard or glob.
	# @return [Middleman::SourceFile, nil]
	Contract Symbol, String, Maybe[Bool] => Maybe[SourceFile]
	def find(type, path, glob=false)

Basically, I'm saying that the `find` method takes 3 parameters, the last of which might be `nil` (also known as `Maybe`). The return value will either be a Record of the `SourceFile` type of `nil`, which is typed as `Maybe[Sourcefile]`.

When I started adding Contracts to the code base, I immediately found dozens of tiny bugs and plenty of places where the docs were out of date with the code. I can't see myself ever working on another Ruby project without this type safety net in place. Like testing, I believe you should add just enough contracts/test to cover your ass and not worry about things like 100% coverage.

## The Future

Going forward, I'd love to see some features from other languages make their way into Ruby. I agree with most everything Erik Michaels-Ober mentions in his talk: [Towards a Higher-Level Language](https://rubyconf.eventer.com/rubyconf-australia-2015-1223/towards-a-higher-level-language-by-erik-michaels-ober-1746). Replace `nil` with `Maybe` in the language. Kill Symbol. Fix the standard numbers (this goes for almost every language using IEEE floats).

I also agree with the goals of [Rubinius X](http://x.rubini.us). I want Immutable Data in Ruby. We NEED a real dependency system. If not as robust as Clojure's, let's atleast reach parity with Python. Even Javascript is beating Ruby now :(

I'd like to see optional typing of inputs/outputs.

And finally, pie in the sky, can we solve packaging apps up into distributable binaries, please? Rust and Go are making us look bad.

Thanks for reading.
