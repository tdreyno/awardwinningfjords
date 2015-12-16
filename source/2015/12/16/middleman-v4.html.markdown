---
title: Middleman v4
tags: middleman
---

Middleman v4 Alpha 1 was released 16 months ago. Development hasn't really slowed in that time. I didn't mean to create a massively different codebase for what amounts to a handful of nice user-facing improvements, but, of course, I fell victim to one of the most common traps in Open Source: The Grand Rewrite.

v4 started it's life near when 3.3 shipped. We had stability, a growing community and a mature extension API which was providing a ton of value. At that point, the Middleman codebase was 6-7 years old. A lot of the code was bad, "idiomatic" Ruby from before we knew better. Much of the code was Pull Request-ed features that I really should have reviewed more closely. So I decided, to start cleaning things up.

One thing that always bugged me about the codebase was the number of global variables and singleton classes. Practically, you could only run one request at a time against Middleman without fear that the state would get corrupted. The "template scope" was also the "config scope" which was also the main app. Templates could set "private" values that the config relied on or mess with other templates that were already in the act of rendering.

The first big rewrite was pulling these pieces apart. Now we have a template scope, which is a clean sandbox that is unique per template render. We have a config scope, which is unique per `config.rb` parsing. And the app no longer allows anyone but itself to set its settings.

Next, I went about implementing every piece of functionality in the project in terms of the official extension API. No backdoors, which had the side effect of empowering use extensions even more.

A lot of core functionality relied on a processing step such as ERb or Sass before helper methods could run. Core extensions such as `asset_hash` required that the user use custom methods, such as `asset_url` in conjunction with correctly configuring Compass to work. I decided to make Compass support an extension and in doing so, had to re-implement a ton of functionality in a generic way. Now, most of the output manipulation takes place in a piece of Rack middleware. Anything that needs to manipulate asset paths can do so on any content, including non-templated files such as SVGs or raw HTML.

Then, I got ambitious. I added type definitions to the entire codebase. It was (and remains) a fantastic decision, but it made merging from stable increasingly difficult.

Next, I tried to find the pieces of state that could be accidently overwritten and I turned these into Immutable Data Structures using the Hamster library.

Finally, I replaced some old "hash with indifferent access" data with wrappers from the hashie project.

All of that, and not a single user-facing feature mentioned. Sure, we added some cool stuff, but, mostly v4 is about making the Middleman core somewhere I want to work. I don't want to dread the dev environment that I need to spend hours every day in.

I do have to admit to making 1 drastic change nobody will like. I've dropped support for Sprockets from core. I intend to open the existing extension to the community, but that library is really the mosy unpleasant code I've ever had to work with. Every 2 months for the past 7 years, it's caused me heartache. I never use it. If you use it, please reach out about taking over maintance of it. Personally, I'll be using Webpack with our new `external_pipeline` feature for all JS in the future.

That's basically it. I hope you all enjoy v4, I know I enjoyed making it. Hopefully we don't have too make "dot oh" bugs and that migration from v3 isn't too painful.
