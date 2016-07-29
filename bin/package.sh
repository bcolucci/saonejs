#!/bin/sh
rm -rf lib \
  && npm run lint \
  && npm run flow \
  && npm run test \
  && npm run doc \
  && node_modules/.bin/babel src -d lib
