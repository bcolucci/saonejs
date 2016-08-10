#!/bin/sh
rm -rf lib \
  && npm run lint \
  && npm run flow \
  && npm run test \
  && npm run docs \
  && node_modules/.bin/babel src -d dist
