#!/bin/sh

# generate the markdown processes list
baseUrl="https://github.com/wuha-io/river/blob/master"
echo "Name | Doc | Source | Test"
echo "-----|-----|--------|-----"
for f in $(find docs/processes -name '*.md' -type f); do
  fname=$(basename $f .md)
  #echo "* $fname | [doc]($baseUrl/$f) | [source]($baseUrl/src/processes/$fname.js) | [test]($baseUrl/test/processes/$fname.js)"
  echo "$fname | [link]($baseUrl/$f) | [link]($baseUrl/src/processes/$fname.js) | [link]($baseUrl/test/processes/$fname.js)"
done
