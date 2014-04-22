---
title: Functional Programming in Javascript === Garbage
tags: functional
---

Functional Programming is great. It allows for simpler programs which are easy to test and reason about. Unfortunately, not all languages are created equal. I've been writing a bit of Clojure and really enjoying myself. As I've ported my learnings and approaches to Javascript, I've encountered a handful of issues which I'd like to talk about.

## Strong Preference for Immutable Data

A core design goal for any Functional system is to avoid global mutable state. That is, global variables which any piece of code may change at any time. With the values of these globals outside of your function's control, it makes it hard to return consistent values and reason about your program.

The solution is to not allow state to mutate (and to avoid global variables if possible). What this means is that pushing an item into an array doesn't overwrite the original array, but instead copies it and appends a new item. Javascript is not very good at deep copying its data structures and doing so will create a ton of intermediate variables which are only used once and then garbage collected.

Clojure uses Persistent Data Structures, which avoids deep copying the whole structure and instead builds upon the previous data by creating a new structure that is the new data, plus the previous value. Since these pieces of data are immutable, we can be assured these references will always be correct. Now, when a change is made, no copy needs to happen. Garbage is avoided and memory usage optimized.

ClojureScript, a version of Clojure which compiles to Javascript, includes Persistent Data Structures if you'd like to experiment. There is also the [Mori](https://github.com/swannodette/mori) project which takes the ClojureScript structures, compiles to a single-file library and gives them a nice Javascript API.

Without Immutable Data, writing Functional programs in Javascript requires lots of attention in avoiding functions which overwrite values or being comfortable with a lot of expensive copying and garbage generation.

## Recursion & Tail Call Elimination

Once you begin working with functions, you'll begin passing references of them to other functions. These are called Higher Order Functions and you may already be familiar with them. Take, for example, `jQuery.fn.each`:

    function logElem() {
      console.log(this);
    }

    jQuery("elem").each(logElem);

This is not very functional, since it relies on setting the `this` value, but you get the idea. For a more functional version, take a look at Underscore's `_.each`.

If I were getting FP-happy, I might start writing an `accumulator` or `reducer` which are both names for a function which takes a list of items and returns a value by iterating over the list.

A `map` will return an updated value for each item:

    function plus1(a) { return a + 1; }

    map(plus1, [1,2,3]); // => [2,3,4]

A `filter` will return a subset of the list, depending on the truthiness of the function.

    function even(a) { return a % 2 === 0; }

    filter(even, [1,2,3]); // => [2]

These can both be written as a reducer.

    function map(f, list) {
      return reduce(function(val, sum) {
        sum.push(f(val));
        return sum;
      }, list, []);
    }

The reducer takes a function which can update a value `sum` which starts at `[]` and is updated once for each item in the list.

Okay, that was a long lead in. Here's how you could naively implement a reducer:

    function reduce(f, list, sum) {
      if (list.length < 1) {
        return sum;
      } else {
        var val = list.shift();
        return reduce(f, list, f(val, list));
      }
    }

Nice and clean (other than the mutating of the list). However, by using recursion in Javascript, we've introduce a time bomb into our code. Each time JS steps deeper into `reduce`, it retains the old stack of calls. Depending on the browser, the version and the amount of available memory, the browser may decide your stack is too deep and throw an unexpected exception. This may not show up in tests and is really scary to consider.

Languages with Tail Call Elimination will recognize this situation and basically rewrite the function into a `while` loop. Since this is a low-level function, we should do the same, but sometimes it's hard to know when you're recurring dangerously.

Another way to avoid the issue is to use an approach called `Trampolining`. Writing a reducer in this way means each iteration does not return a value, instead it returns a function which calls the next iteration. It would look like this:

    function trampoline(f) {
      return function() {
        var result = f.apply(this, arguments);

        while (result instanceof Function) {
          result = result();
        }

        return result;
      };
    }

    var reduce = trampoline(function myself(f, list, sum) {
      if (list.length < 1) {
        return sum;
      } else {
        return function() {
          var val = list.shift();
          return myself(f, list, f(val, list));
        };
      }
    });

At this point in time, we're feeling pretty damn proud of ourselves. Our recursive functions won't randomly explode. We've got a core iteration method we can build `map`, `filter` and more upon. But we've introduced a critical flaw: more garbage.

Now, every single time we iterate over a list, we create 1 temporary function for each item in the list. If you do something like the following, you're going to generate a ton of garbage and drop frames:

    requestAnimationFrame(function() {
      each(tickPhysics, worldEntities);
    });

Therefore, to avoid garbage generation, we need to remember to avoid recursion in our low-level iterators and use a simple, but not very functional, `while` loop. For a much more in-depth discussion of Trampolines in JS, read [Reginald Braithwaite's article](http://raganwald.com/2013/03/28/trampolines-in-javascript.html).

## Function Composition & Partial Application

Instead of passing anonymous functions to iterators, many Functional programmers use Composition and Partial Application to generate new functions instead. Above we had the example of `plus`, this could be written like so:

    function plus(a, b) { return a + b; }

    var plus1 = partial(plus, 1);

    map(plus1, [1,2,3]); // => [2,3,4]

Now, we have a `plus1` function which is simply the `plus` function with the first argument already filled in. An implementation of `partial` would look like this:

    function partial() {
      var args = Array.prototype.slice.call(arguments, 0);
      var f = args.shift();

      return function partialExecute_() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f.apply(this, args.concat(args2));
      };
    }

Notice that we create an Array and a Function every time we call partial and an additional array each time the `partial`ed function is called. This isn't a critical problem, but it is something to be careful of.

Function composition is similar, it allows you to take two functions and create a new function which calls both of them.

    function plus1(a) { return a + 1; };
    function mult2(a) { return a * 2; };

    var addThenMult = compose(mult2, plus1);

    map(addThenMult, [1,2,3]); // => [4,6,8]

A simple implementation would be:

    function compose() {
      var fns = Array.prototype.slice.call(arguments, 0);

      return function composedExecute_(value) {
        for (var i = fns.length - 1; i >= 0; --i) {
          value = fns[i](value);
        }
        return value;
      };
    }

More Arrays and more Functions. Again, not a big deal, but if you are doing a lot of [Point-free Programming](http://en.wikipedia.org/wiki/Tacit_programming), then your loops have the possibility of generating a ton of garbage.

## Conclusion

**Never forget that Javascript hates you.** Functional programming can be a nice way to write a system, but always remember the language you are running on. Most of these issues can be overcome with a little attention.

Finally, I'll use this opportunity to plug Reginald Braithwaite's wonderful book on Functional Programming: [Javascript Allongé](https://leanpub.com/javascript-allonge/read). It's free to read, so you should probably do that.