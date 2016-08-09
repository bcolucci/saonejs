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

# generate the markdown processes list
baseUrl="https://github.com/wuha-io/saonejs/blob/master"
ech="\n# Processes"
ech="$ech\n"
ech="$ech\nName | | | |"
ech="$ech\n-----|-----|--------|-----"
for f in $(find docs/processes -name '*.md' -type f | sort); do
  fname=$(basename $f .md)
  #echo "* $fname | [doc]($baseUrl/$f) | [source]($baseUrl/src/processes/$fname.js) | [test]($baseUrl/test/processes/$fname.js)"
  ech="$ech\n$fname | [documentation]($baseUrl/$f) | [source]($baseUrl/src/processes/$fname.js) | [tests]($baseUrl/test/processes/$fname.js)"
done

echo $ech > docs/readme.md
