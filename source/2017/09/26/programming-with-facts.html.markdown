---
title: Programming With Facts
tags: javascript
---

Redux is an infinitely deep tree and every piece of code that accesses it needs to know where to find each piece of data.

MobX is a set of inter-dependent silos which prefer to be singletons and require a lot of magic (such as decorators and observables).

I could write several thousand words on the difficulties of building large Redux or MobX apps, but I'm sure there are a couple hundred such posts already online.

Instead, I want to try to envision another possible approach to the problem of client-side state management.

My goals are to:

* Avoid nested data structures.
* Avoid silos, and the schemas those silos require.
* Avoid `class`es and `decorators` because they are a little too magical in JS.
* Be "reactive", but not require MobX `computed`, Redux `selectors` or RxJS pipelines.

My solution, is to borrow from Datomic's schemaless fact-based database. If you know anything about logic programming, this is going to look a bit familiar.

## What is a Fact?

What if we had a completely flat database? Any piece of code could relate any data to any specific object in the system. If module A needs users to have email addresses and module B needs users to have physical address, a schema-less approach will allow them to work without ever having to step on each others toes.

Simply put, a fact is a record (or database row) with a unique id (think guid or whatever their primary key would be), the name of the fact (such as `email`) and the value of that fact (`demo@example.com`).

	[ uniqueId, variableName, value ]

If I were going to model myself, it might look something like this:

	[ 1, "name",  "Thomas"                         ]
	[ 1, "email", "me@tdreyno.com"                 ]
	[ 1, "url",   "https://awardwinningfjords.com" ]

That's just about it. Imagine your entire Redux store as a long list of facts known about the application state.

Because the format is flat and simple, it would be very easy to build tooling to inspect, debug and add time traveling abilities.

All values must be primitives, meaning serialization is trival. Simply `JSON.stringify` to localstorage and "offline" mode is pretty much done. Want to upload offline changes to the server? Count the number of rows on the server, count the number on the client. Fill the server in on the X number of new changes.

## Querying

Okay, okay. So constantly searching over a massive list of rows for the data you're looking for isn't going to be very fast. It should be surprising that a solution that mimicks a database will need a query language.

Querying looks almost exactly like the data format, but with variables linking rows together.

For example, if I wanted to query for all the data on a single user, I can use the wildcard `_` character:

	[1, _, _]

Which will get me all rows with `1` in the id position.

If I wanted all emails in the system:

	[_, "email", _]

In addition to wildcards, you can also write functions to narrow down queries. If I wanted all the `url`s on SSL, I could ask:

	[_, "url", contains("https://")]

Finally, variables can be used to relate multiple queries. If I wanted the `email` of people named `Thomas`:

	["?id", "name",  "Thomas"]
	["?id", "email", "?email"]

Strings starting with `?` are variables. If the variable appears in more than 1 row, they will create subqueries. Because the first row only matches the id `1`, the second row will ask for the `email` of row `1`. The result will be an object with all matched variables:

	{ id: 1, email: "me@tdreyno.com" }

These queries are automatically cached/computed using a Rete network. They will be automatically recalculated reactively when values which are not wildcards are changed (new users named "Thomas" and new emails).

## Rules

The final piece of the puzzle is adding derived state. If Redux these live in selectors, in MobX they are computed. In this system, they are just more rows in the database.

Say I wanted to provide a fact about whether the user uses SSL. I can write a Rule which, when matched, will add a fact. When the facts triggering the rule change, the derived fact can be cleaned up. Other pieces of code don't need to know the difference between "real" state and derived state.

Here's an example:

	rule(

		["?id", "url", contains("https://")]

	).then(match =>

		[match.id, "usesSSL", true]

	)

Now, for every user `id` which has a url containing `https://`, a coresponding `usesSSL` fact will be created for that `id`.

If the value of `url` changes, or if the user is removed, the derived fact will be cleaned up.

## Demo

The now requisite TodoMVC demo can be found at: 

* [TodoMVC Demo](https://satelite.netlify.com)
* [TodoMVC Source Code](https://github.com/tdreyno/satelite/tree/master/demo/todomvc/src)

The React integration layer provides the `subscribe` HOC which turns a query into React props. For example:

	subscribe(
		["global", "ui/filter", "?todoFilter"],
		["global", "doneCount", "?completedCount"],
		["global", "activeCount", "?activeTodoCount"],
		collect("?completed", [_, "todo/completed", true]),
	)

Which creates props for three pieces of UI state (`todoFilter`, `completedCount` and `activeTodoCount`). It also uses `collect` to turn a subquery into an array. In this example, an array of all todos which have `completed` set to `true`.

## Next Steps

My plans are to find a mid-sized side project, or convert an existing Redux or MobX project, to get a better feeling for how the approach works on non-toy projects.

I'd love feedback! Thanks for reading.

## Further reading

* [Datomic Queryies](http://docs.datomic.com/query.html#queries)
* [Prolog](https://en.wikipedia.org/wiki/Prolog)
* [Rete Network](https://en.wikipedia.org/wiki/Rete_algorithm)