Rux Rolli
=========

**Rux Rolli** is an experimental React-based framework for esolang
interpreters and other computational animations.  It is currently
a work in progress.

### Quick start

Install node and npm (use nvm).  Clone this repo.  `cd` into this
repo directory.  Run `npm install`.  Run `npm run build:App`.
Open `dist/demo.html` in your favourite web browser.

### Background

Historically, the [yoob][] project was such a framework in Java,
intended to run as a Java applet.  Its nominal successor was
[yoob.js][], however yoob.js was never a proper framework, and it
degraded into a sprawling toolkit of miscellany.  Rux Rolli aims
to be restore the idea to the status of a framework.  Although
Rux Rolli is written in React, esolangs implemented in Rux Rolli
need no knowledge of React (so in fact additional or alternate
implementations of Rux Rolli, using other frontend frameworks,
could one day be built).

### Architectural Features

Rux Rolli is written in TypeScript.  The included build command
translates it to JavaScript using browserify and [tsify][].

A notable architectural feature is the class hierarchy of
`Action` objects.  Each of these objects is self-describing
in the sense that it defines its own preconditions, state
transformation, and side effects, and these can be accessed
independently by other objects.  So, for example, the
`ActionButton` component can consult the precondition to
determine whether the UI button is disabled or enabled.
Further, the preconditions could (in theory) be used to
construct a state machine diagram showing the allowable
transitions from state to state.

An esolang (or other computational animation) is defined by
a number of pure functions, which the `Action` objects apply
as part of their state transformation.  These functions
include:

*   `load`: transform the program text into the initial
    configuration
*   `step`: given a configuration, return the configuration
    that immediately follows it, or `null` if there is none

(possibly others too, but those are the main ones.)

Also notable (but not yet implemented) is the fact that the
configuration is also a self-describing data structure.  It
may consist of playfields, stacks, queues, tapes, and so
forth.  Each of these is represented as a JavaScript object,
one field of which names the type of data that it contains.
Other types may indicate that the object is merely a container
of other objects.  So for example, a configuration may
contain a playfield and a stack.  There shall be a React
component which takes any such self-describing data structure
and displays it sensibly in the DOM (knock on wood).

[yoob]: https://catseye.tc/node/yoob
[yoob.js]: https://catseye.tc/node/yoob.js
[tsify]: https://github.com/TypeStrong/tsify
