#!/bin/sh

rm -rf docs/*
void=''

for f in $(find src/ -name '*.js' -type f); do
  fname=$(basename $f .js)
  if [ $fname = "index" ]; then continue; fi
  ddir="docs/$(dirname $f)"
  ddir=$(echo $ddir | sed -r s/src\//)
  if [ ! -d "$ddir" ]; then mkdir -p $ddir; fi
  echo "> $ddir/$fname.md"
  node_modules/.bin/documentation build $f -f md -o $ddir/$fname.md
done
