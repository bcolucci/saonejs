#!/bin/sh
rm -rf cov && mkdir cov
npm run build
cp -r dist cov/src
node_modules/.bin/babel test -d cov/test
cd cov
  #TODO why it doesn't work?
  ../node_modules/.bin/istanbul cover ../node_modules/.bin/_mocha -- -R spec
cd -
mv cov/coverage .
rm -rf cov
