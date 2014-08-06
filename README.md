C-O-L-A-B.github.io
===================

A static site generator built with [assemble](http://assemble.io)

Develop on the 'assemble' branch, not 'master', which is reserved for the github.io site.

## Build

On the 'assemble' branch run:

`grunt build`

to assemble the site and copy assets into /dist.

## Deploy to Github Site

On the 'assemble' branch run:

`grunt deploy`

to push only /dist dir contents to master (https://gist.github.com/cobyism/4730490)