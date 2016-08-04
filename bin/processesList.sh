#!/bin/sh

# generate the markdown processes list
for f in $(find docs/processes -name '*.md' -type f); do
  echo "* [$(basename $f)](https://github.com/wuha-io/river/blob/master/$f)"
done
