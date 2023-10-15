The Rux Rolli API
=================

This document describes version 0.1 of the Rux Rolli API.

The Rux Rolli API is a framework for describing esolangs and other computational animations.
In this document, for the sake of concreteness, we will refer to the thing that is being
described in the framework, as an esolang.

Functions and Data Types
------------------------

The Rux Rolli API aims to be reasonably implementation-language agnostic; however,
it is described in terms of functions and data types, so these must be constructed
(or simulated somehow, if necessary) in the implementation language.

A function is given one or more values as input and produces one value as output.
A function has no side-effects.

Data types consist of strings, integers, boolean, tagged tuples, and unions of tagged tuples.
Whether these data types are implemented in terms of the implementation language's types
or not is of no real consequence.  The tag on a tagged tuple serves to identify
which tagged tuple type the value represents when it is in a union of tagged tuples.

We may also sometimes talk about a list type, denoted `[]`.  This can be
realized using tagged tuples as a Cons-list, i.e. a `[X]` is the union of
`Cons X Y` (where `Y` = `List X`) and `Nil`.  It is not a requirement to
realize it this way.

Esolang Definition
-------------------

A esolang definition consists of defining three pure (side-effect-free) functions:

### load(String) -> Next Configuration | Error String

This is called when the user loads a program into the esolang executor initially.
The program is provided as a textual string.
The function is responsible for parsing the string into the internal representation
of the program, that is, the initial state of the program represented by the string.
If it cannot do that it should return an error describing the reason.

### next(Configuration) -> Next Configuration | Halt Configuration | Input Configuration | Error String

This is called to advance the state of the program.  Given a configuration, this
function is responsible for returning either the next configuration in the program
that continues to run, a configuration in which the program is to halt,
a configuration into which the program is suspended to wait for input, or
a runtime error.

### recv(Configuration, String) -> Next Configuration | Halt Configuration | Input Configuration | Error String

This is called sometime after the program has paused to receive input, and the
input is now available.  The input is provided by the string.  The function is
responsible for advancing to the the next configuration in the program,
presumably by updating the configuration based on the input.  Halting and
requesting more input are further options.

Configurations
--------------

A Configuration represents the state of a running program in the esolang at a
given point during its execution.

The Configuration type is an abstract type, with a number of concrete
instances.  These concrete types are described below.

Note that all these types should be considered _abstract data types_.  Values
of these types should only be manipulated with the operations provided;
manipulating them otherwise is an undefined behaviour.

### <> Composite [Configuration]

A Composite configuration contains a list of sub-Configurations, called its
"children.  This kind of configuration is used to represent a complex structure
of the state of an esolang, e.g. when its configurations consist of both
a Playfield and a Stack.

Composite supports these operations:

#### makeComposite([Configuration]) -> Composite

Construct a Composite.

#### getStackChild(Composite, Int) -> Stack

If the Composite configuration contains a Stack, this function returns it.
If it contains more than one stack, the second parameter can be used to
select which stack to return.  If the value is 0, it should return the
first Stack; if 1, the second Stack; and so forth (with no regard to
configurations of other types within the Composite).

In implementation languages that support optional parameters to functions,
this index may be omitted; in which case it defaults to 0.

If the Composite does not contain a Stack at the given index,
"an error occurs".

#### getTapeChild(Composite, Int) -> Tape

Same as `getStackChild`, but for Tapes.

#### getPlayfieldChild(Composite, Int) -> Playfield

Same as `getStackChild`, but for Playfields.

#### getTextChild(Composite, Int) -> Text

Same as `getStackChild`, but for Playfields.

### <> Stack

An unbounded first-in, first-out stack of values.

Note that, if the implementation language supports it, this type may be
parameterized; its parameter is the type of the values on the stack.

Stack supports these operations:

#### makeStack() -> Stack

Construct an empty Stack.

#### isEmpty(Stack) -> Boolean

_TBW_

#### push(Stack, Any) -> Stack

_TBW_

#### pop(Stack) -> Stack

_TBW_

#### top(Stack) -> Any

_TBW_

### <> Tape

An unbounded tape of cells, where each cell may contain a value.

Note that, if the implementation language supports it, this type may be
parameterized; its parameter is the type of the values written to the cells.

Tape supports these operations: _TBW_

### <> Playfield

An unbounded playfield of cells, where each cell may contain a value.

Note that, if the implementation language supports it, this type may be
parameterized; its parameter is the type of the values written to the cells.

### <> Text

_TBW_
