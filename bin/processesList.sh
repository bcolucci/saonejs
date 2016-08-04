#!/bin/sh

# generate the markdown processes list
for f in $(find docs/processes -name '*.md' -type f); do
  fname=$(basename $f .md)
  echo "* $fname [doc](https://github.com/wuha-io/river/blob/master/$f) | [source](https://github.com/wuha-io/river/blob/master/src/processes/$fname.js)"
done
