
# River.js

**In active development**, feel free to contribute.

## Purpose

River goal is to provide a very simple way to create (work)flows of data (streams).
River is not another stream library but something to help you to work with streams eyes closed...

[Generated documentation](https://github.com/wuha-io/river/blob/master/docs/)

## Test it

    git clone https://github.com/wuha-io/river.git \
      && cd river \
      && npm install \
      && npm test

    # run an example
    ./bnode examples/users.js

## Processes

Name | Doc | Source | Test
-----|-----|--------|-----
frequency | [link](https://github.com/wuha-io/river/blob/master/docs/processes/frequency.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/frequency.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/frequency.js)
categorize | [link](https://github.com/wuha-io/river/blob/master/docs/processes/categorize.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/categorize.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/categorize.js)
compactWithChunk | [link](https://github.com/wuha-io/river/blob/master/docs/processes/compactWithChunk.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/compactWithChunk.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/compactWithChunk.js)
map | [link](https://github.com/wuha-io/river/blob/master/docs/processes/map.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/map.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/map.js)
buffer | [link](https://github.com/wuha-io/river/blob/master/docs/processes/buffer.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/buffer.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/buffer.js)
cast | [link](https://github.com/wuha-io/river/blob/master/docs/processes/cast.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/cast.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/cast.js)
tick | [link](https://github.com/wuha-io/river/blob/master/docs/processes/tick.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/tick.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/tick.js)
values | [link](https://github.com/wuha-io/river/blob/master/docs/processes/values.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/values.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/values.js)
flatten | [link](https://github.com/wuha-io/river/blob/master/docs/processes/flatten.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/flatten.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/flatten.js)
compact | [link](https://github.com/wuha-io/river/blob/master/docs/processes/compact.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/compact.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/compact.js)
between | [link](https://github.com/wuha-io/river/blob/master/docs/processes/between.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/between.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/between.js)
unique | [link](https://github.com/wuha-io/river/blob/master/docs/processes/unique.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/unique.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/unique.js)
keys | [link](https://github.com/wuha-io/river/blob/master/docs/processes/keys.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/keys.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/keys.js)
filter | [link](https://github.com/wuha-io/river/blob/master/docs/processes/filter.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/filter.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/filter.js)
head | [link](https://github.com/wuha-io/river/blob/master/docs/processes/head.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/head.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/head.js)
complement | [link](https://github.com/wuha-io/river/blob/master/docs/processes/complement.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/complement.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/complement.js)
each | [link](https://github.com/wuha-io/river/blob/master/docs/processes/each.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/each.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/each.js)
dropRepeats | [link](https://github.com/wuha-io/river/blob/master/docs/processes/dropRepeats.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/dropRepeats.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/dropRepeats.js)
count | [link](https://github.com/wuha-io/river/blob/master/docs/processes/count.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/count.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/count.js)
round | [link](https://github.com/wuha-io/river/blob/master/docs/processes/round.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/round.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/round.js)
log | [link](https://github.com/wuha-io/river/blob/master/docs/processes/log.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/log.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/log.js)
spread | [link](https://github.com/wuha-io/river/blob/master/docs/processes/spread.md) | [link](https://github.com/wuha-io/river/blob/master/src/processes/spread.js) | [link](https://github.com/wuha-io/river/blob/master/test/processes/spread.js)

## Roadmap

  - Implement all the tests
  - Make documentation
  - Implement sources (Elasticsearch, File, JSON, SQLite...)
  - Implement some endpoints
  - Make a string grammar we can compile to JavaScript with River
