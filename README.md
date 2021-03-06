Rux Rolli
=========

**Rux Rolli** is an experimental React-based framework for esolang
interpreters and other computational animations.  It is currently
a work in progress.

![state machine diagram for Rux Rolli](images/state-machine-diagram.png?raw=true)

### Quick start

Install node and npm (use nvm).  Clone this repo.  `cd` into this
repo directory.  Run `npm install`.  Run `npm run build:App`.
Open `dist/demo.html` in your favourite web browser.

### Background

Historically, the [yoob][] project was such a framework in Java,
intended to run as a Java applet.  Its nominal successor was
[yoob.js][], however yoob.js was never a proper framework, and it
degraded into a sprawling toolkit of miscellany.  Rux Rolli aims
to be restore the idea to the status of a framework.

### Architectural Features

Rux Rolli is written in TypeScript.  The included build command
translates it to JavaScript using browserify and [tsify][].

Although Rux Rolli is built with React, esolangs implemented in
Rux Rolli need no knowledge of React, so in fact additional or
alternate implementations of Rux Rolli, using other frontend
frameworks, could one day be built.

Rux Rolli is an experimental project, so many of the design
choices are experimental in nature.  Some of the more significant
design choices are listed below.  For more information on any
of these, see the [Architecture](doc/Architecture.md) document.

*   **Examinable, Self-Describing Command Objects** define
    what can be done to the state of the system, and this
    informs UI components such as buttons.

*   **Purely Functional Small-Step Operational Semantics**
    -- each esolang or other computational animation
    defined within Rux Rolli is defined by a pair of pure
    functions, `load` and `next`.

*   **Self-Describing Configurations** describe the
    instantaneous state of the system, and describe not
    only what should be displayed in the UI, but how.

[yoob]: https://catseye.tc/node/yoob
[yoob.js]: https://catseye.tc/node/yoob.js
[tsify]: https://github.com/TypeStrong/tsify
