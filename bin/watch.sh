#!/bin/sh
node_modules/.bin/watch 'npm test' src/ \
  --ignoreDotFiles \
  --ignoreUnreadable
