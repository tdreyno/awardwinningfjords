# Code Samples

Below are a handful of code samples in several different languages and paradigms. All code samples are from 2017, except for the final Ruby one.

* [Google I/O: React and MobX](#google-i-o-react-and-mobx)
* [Google Rainforest: Browser JS / WebAudio](#google-rainforest-browser-js-webaudio)
* [Fact-based Database / Typescript](#fact-based-database-typescript)
* [JSONAPI Implementation / Node / TypeScript](#jsonapi-implementation-node-typescript)
* [Reactive Config for Middleman / Ruby](#reactive-config-for-middleman-ruby)

## Google I/O: React and MobX

In 2017, I worked on the web app for on-the-ground attendees of Google's primary developer conference. This is the 7th year in a row I've build web apps and interactive experiences for [Google I/O](https://events.google.com/io/). The app was built in React, but substituted Preact during the production build for licensing reasons. Included front-end unit tests, MobX store binding for data and [Storybook](https://storybook.js.org/) for visual regression testing.

### Code

This is a [Render Props](https://reactjs.org/docs/render-props.html)-style utility component which show/hides children based on time windows. This allows us to configure different views and layouts over the course of the event (lunch time, after hours concert, pre-Keynote hype). 

It uses [TComb](https://github.com/gcanti/tcomb) for type checking props in vanilla JS. The `Story.js` file includes test specs and previews of various props configurations.

https://gist.github.com/tdreyno/ceb237cf5b2b56a15b1587db4b16e767

I had to re-implement [MobX](https://github.com/mobxjs/mobx) on this project due to some licensing concerns from the client. That code is here:

https://gist.github.com/tdreyno/6e2fe97008113a6ad3c1df2e2de26dd5

## Google Rainforest: Browser JS / WebAudio

Built for Google Rainforest (https://www.google.com/about/stories/rainforest/) project, which describes how Google's Tensorflow product is being used to identify illegal logging.

### Code

WebAudio player for loading and controlling audio sources. Uses Google Closure Compiler to add type-checking to vanilla javascript:

https://gist.github.com/tdreyno/cf7242183671dd90bc1e451bdc24f712

## Fact-based Database / Typescript

Last year, I took 2 weeks of professional development time to explore whether the concepts from Clojure [Datomic](https://www.datomic.com) database could be used for client-side state management.

This lead me to implement a [Production Rule](https://en.wikipedia.org/wiki/Production_(computer_science)) system similar to [Prolog](https://en.wikipedia.org/wiki/Prolog) in TypeScript.

I wrote about the API on my blog: https://awardwinningfjords.com/2017/09/26/programming-with-facts.html

I used the published paper [Production Matching for Large Learning Systems by RB Doorenbos](http://reports-archive.adm.cs.cmu.edu/anon/1995/CMU-CS-95-113.pdf) to implement the core, which is known as a [Rete Network](https://en.wikipedia.org/wiki/Rete_algorithm).

Finally, [I implemented the common TodoMVC example in my new libray](http://satelite.netlify.com).

### Code

The full library can be found here:

https://github.com/tdreyno/satelite

This file add "accumulators," which are basically reducers that can take query result sets and return `sum`/`min`/`max`, etc.

https://github.com/tdreyno/satelite/blob/master/src/accumulators.ts

## JSONAPI Implementation / Node / TypeScript

Built for the NYTimes Moderation Tool (http://www.instrument.com/work/moderator).

### Code

An ORM/Database agnostic implementation of [JSONAPI](http://jsonapi.org) in TypeScript.

https://github.com/conversationai/conversationai-moderator/tree/master/packages/jsonapi/src

## Reactive Config for Middleman / Ruby

[Middleman](https://middlemanapp.com) is an open-source Static Site Generator that is over 10 years old and has been downloaded over 2 million times. I've maintained the project all that time, with contributions from the community.

### Code

This is an implementation of [Reactive Programming](https://en.wikipedia.org/wiki/Reactive_programming) in Ruby. It replaces imperative Ruby in a config file with [Monadic](https://en.wikipedia.org/wiki/Monad_(functional_programming)) versions via [metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming).

Creates a tree of all code in the config file, so that it can be rerun when data changes. For example:

    data[:people].each { |person| page "/#{person.name}" }

That would create a static output file for each person from a `person.yaml` file. When that file changes, the command is rewound and rerun to update the internal data model. 

Uses Contracts.rb to add [Design by Contract](https://en.wikipedia.org/wiki/Design_by_contract) "types" to Ruby.

https://github.com/middleman/middleman/blob/master/middleman-core/lib/middleman-core/core_extensions/collections.rb