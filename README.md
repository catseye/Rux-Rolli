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

*   written in TypeScript, builds with browserify using tsify
*   driven by "exploded actions", each of which defines its own
    preconditions, state transformation, and side effects
*   (coming) a component to display self-describing data in an
    appropriate visual breakdown

[yoob]: https://catseye.tc/node/yoob
[yoob.js]: https://catseye.tc/node/yoob.js
