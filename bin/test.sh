#!/bin/sh
node_modules/.bin/_mocha \
  --opts ./mocha.opts \
  --compilers js:babel-register
