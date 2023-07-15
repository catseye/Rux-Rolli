Rux Rolli
=========

**Rux Rolli** is an experimental React-based framework for esolang
interpreters and other computational animations.  It is currently
a work in progress.

### Quick start

Install node (v16) and npm (use [nvm][]).  Clone this repo.  `cd` into this
repo directory.  Run `npm install`.

The framework is written in TypeScript and the build system uses
[Vite][] with SWC.  Run `npm run dev` to run a development server.

To try the production build, run `npm run build`.  Then start a
local web server in the `dist` directory, e.g.
`cd src && python3 -m http.server` and go to `http://localhost:8000/`
in your favourite web browser.

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
    defined within Rux Rolli is defined by a triple of pure
    functions: `load`, `next`, and `recv`.

*   **Self-Describing Configurations** describe the
    instantaneous state of the system, and describe not
    only what should be displayed in the UI, but how.

![state machine diagram for Rux Rolli](images/state-machine-diagram.png?raw=true)

[yoob]: https://catseye.tc/node/yoob
[yoob.js]: https://catseye.tc/node/yoob.js
[tsify]: https://github.com/TypeStrong/tsify
[nvm]: https://github.com/nvm-sh/nvm
[Vite]: https://vitejs.dev/

### TODO

#### Playfields

*   Load multi-line string into Playfield.
*   Extent on Playfield should include cursors.
*   Extent on Playfield should be pinnable by view.
*   Extent tracking on Playfield (only update when modified).
*   Scrollable view of Playfield.

#### Language

*   Implement a realer example esolang than what we have so far.
*   Select preset examples to load from dropdown.
*   Some way to take the language definition from plain JavaScript injected from elsewhere.

#### Other

*   Deal with pausing for input when it wasn't previously running
*   Document better how Commands work and what it means to `enact` them
    (highlighting the places where this is done in the codebase.)
*   Tape Configuration.
*   Configurations can have id's (for access), titles (for display).
*   Convert other configurations to use Immutable.js data structures.
*   Add some unit tests.
