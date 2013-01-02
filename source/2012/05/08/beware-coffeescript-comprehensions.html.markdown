---
title: Beware of CoffeeScript Comprehensions
date: 2012-05-08
blog_editor_id: 19
---

[Comprehensions]: http://coffeescript.org/#loops
[the Javascript Garbage Collector will cleanup these unused functions, causing the framerate to stutter]: http://www.scirra.com/blog/76/how-to-write-low-garbage-real-time-javascript

I've recently spent some time addressing bugs and speed issues with the first large CoffeeScript project (nearly 10,000 lines of code) I've worked on with multiple developers.

For the most part, the process was painless. CoffeeScript hides a great deal of complexity beneath it's glossy syntax, which is great for writing simple and readable code. But there is always tension between high-level languages and raw performance. If you're an experienced Javascript developer, the compiled output of a snippet of CoffeeScript code should be recognizable, readable and pretty much what you'd write if you wrote Javascript directly.

Here's an example:

    list = [1..3]
    console.log(i) for i in list

Becomes:

    var i, list, _i, _len;

    list = [1, 2, 3];

    for (_i = 0, _len = list.length; _i < _len; _i++) {
      i = list[_i];
      console.log(i);
    }

Great, a simple for loop which avoids recalculating `list.length` on every iteration. However, CoffeeScript also overloads the `for` loop with the ability to do [Comprehensions]. Comprehensions allow you to manipulate the items being iterated over, provide a native way of running `map`, `filter`, `reject` and other manipulative functions on a collection. **Whether a `for` loop acts as a comprehension is dependent on context.**

Here are some examples:

## Assigning a `for` loop to a variable:

    list = [1..3]
    output = for i in list
      console.log(i)

Becomes:
  
    var i, list, output;

    list = [1, 2, 3];

    output = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        i = list[_i];
        _results.push(console.log(i));
      }
      return _results;
    })();
  
Notice that we now create an empty array to hold the result of the comprehension, then the last line of the `for` loop is used as the value which is pushed into that array. Additionally, there is a wrapping anonymous function which immediately executes to keep some of the loop variables from leaking out of their scope.

This result can also be triggered as a one-liner wrapped in parenthesis:

    list = [1..3]
    output = (console.log(i) for i in list)

For the most part, this makes sense. You are requesting an output variable, so one is created, even if the results aren't meaningful (just the return value of `console.log`). I would like to point out that this code will create 1 anonymous function every single time it is executed. If this loop were used frequently enough, such as inside a `setInterval` or `requestAnimationFrame` loop, it could begin producing and throwing away up to 60 anonymous functions per second, per usage. Eventually, [the Javascript Garbage Collector will cleanup these unused functions, causing the framerate to stutter].

If you want to avoid this, you can write the `push` portion of your array building manually:

    list = [1..3]
    output = []
    output.push(i+1) for i in list
    
Becomes:

    var i, list, output, _i, _len;

    list = [1, 2, 3];

    output = [];

    for (_i = 0, _len = list.length; _i < _len; _i++) {
      i = list[_i];
      output.push(i + 1);
    }

## Implicitly Returning Comprehensions

Here's where you need to pay close attention. **If you have a `for` loop as the last piece of code in a function, it will be used as the return value and generate a resulting array, even when not explicitly requests.**

For example:

    printI = ->
      list = [1..3]
      console.log(i) for i in list

Becomes:

    var printI;

    printI = function() {
      var i, list, _i, _len, _results;
      list = [1, 2, 3];
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        i = list[_i];
        _results.push(console.log(i));
      }
      return _results;
    };

In our codebase, this happened very often. The above code is simply for debugging, there is no need to create, build and return an array every single time it is called. Our code had a render tree, on every frame, we would render the root object, then use a `for` loop to render each of that object's children. **Which means we were building and discarding these implicit comprehension arrays once for every single drawn component in our system every single frame.** It adds up.

## Solution

My suggestion is to document all method return values and set them explicitly when writing CoffeeScript. Here is how the above methods __should__ look:

    # Log each item in the array
    #
    # list - An array of integers to be logged
    #
    # Returns undefined.
    printI = (list) ->
      console.log(i) for i in list
      undefined
  
    printI([1..3])

Which becomes a simple loop with no return value:

    var printI;

    printI = function(list) {
      var i, _i, _len;
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        i = list[_i];
        console.log(i);
      }
      return;
    };

    printI([1, 2, 3]);

### Check Your Own Code

Try searching through your output Javascript for `return _results`, that will reveal if your code might be accidentally returning unnecessary comprehensions.