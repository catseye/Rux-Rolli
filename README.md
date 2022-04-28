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

#### Examinable Command Objects

A notable architectural feature is the class hierarchy of
`Command` objects.  Each of these objects is self-describing
in the sense that it defines its own preconditions, state
transformation, and side effects, and these can be examined
seperately by other objects.  So, for example, the
`CommandButton` component can consult the precondition of
its `Command` to determine whether the UI button is disabled
or enabled.

Further, the state transformations can be collected and
composed to form a reducer -- and going even further,
the side effects can also be collected, to form a
transducer in the style of The Elm Architecture.  Reasons
for why it's desirable to do this will be made clear below.

Alternately, the transformations and preconditions could
(in theory) be used to construct a state machine diagram
showing the allowable transitions from state to state.  Or
confirm that it conforms to a given state machine.  Here is
a diagram outlining the current state structure:

![simple state machine diagram for Rux Rolli](images/state-machine-simple.png?raw=true)

#### Small-Step Operational Semantics

An esolang (or other computational animation) is defined by
a number of pure functions, which the `Command` objects apply
as part of their state transformation.  These functions
include:

*   `load`: transform the program text into the initial
    configuration
*   `step`: given a configuration, return the configuration
    that immediately follows it, or `null` if there is none

(possibly others too, but those are the main ones.)

"Configuration" is the word we use for an instantaneous
description of the program state.

#### Self-Describing Configurations

Also notable is the fact that a configuration, much like
a `Command` object, is a self-describing data structure.

It may consist of playfields, stacks, queues, tapes, and so
forth.  Each of these is represented as a JavaScript object,
one field of which names the type of data that it contains.
Other types may indicate that the object is merely a container
of other objects.  So for example, a configuration may
contain a playfield and a stack.

The `<display>` React component (in progress) takes any such
self-describing configuration data structure and displays it
sensibly in the DOM (knock on wood).

#### Transducers (The Elm Architecture)

We have a situation where a background event -- namely, a
JavaScript timeout expriring -- triggers an `Command`.

If we have a reducer, we can simply `dispatch` when this
happens.

However, in this instance, we want the command to perform
some side effect (namely, cancelling the timer) under
some conditions (namely, the program has halted).

The problem is twofold:

1. we don't have access to the current state of the reducer
   when we call `dispatch`
2. the reducer itself can't cancel the timer because it
   needs to be a pure function free from side-effects

This necessitates using a some more sophisticated approach
than simply using a reducer.

We could use a transducer instead, which is like a reducer
except it can trigger side effects after a state transition
has been made.

[yoob]: https://catseye.tc/node/yoob
[yoob.js]: https://catseye.tc/node/yoob.js
[tsify]: https://github.com/TypeStrong/tsify
