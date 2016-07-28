#!/bin/sh
node node_modules/.bin/_mocha \
  --opts ./test/mocha.opts \
  --compilers js:babel-register
