
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

* frequency [doc](https://github.com/wuha-io/river/blob/master/docs/processes/frequency.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/frequency.js)
* categorize [doc](https://github.com/wuha-io/river/blob/master/docs/processes/categorize.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/categorize.js)
* compactWithChunk [doc](https://github.com/wuha-io/river/blob/master/docs/processes/compactWithChunk.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/compactWithChunk.js)
* map [doc](https://github.com/wuha-io/river/blob/master/docs/processes/map.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/map.js)
* buffer [doc](https://github.com/wuha-io/river/blob/master/docs/processes/buffer.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/buffer.js)
* cast [doc](https://github.com/wuha-io/river/blob/master/docs/processes/cast.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/cast.js)
* tick [doc](https://github.com/wuha-io/river/blob/master/docs/processes/tick.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/tick.js)
* values [doc](https://github.com/wuha-io/river/blob/master/docs/processes/values.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/values.js)
* flatten [doc](https://github.com/wuha-io/river/blob/master/docs/processes/flatten.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/flatten.js)
* compact [doc](https://github.com/wuha-io/river/blob/master/docs/processes/compact.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/compact.js)
* between [doc](https://github.com/wuha-io/river/blob/master/docs/processes/between.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/between.js)
* unique [doc](https://github.com/wuha-io/river/blob/master/docs/processes/unique.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/unique.js)
* filter [doc](https://github.com/wuha-io/river/blob/master/docs/processes/filter.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/filter.js)
* head [doc](https://github.com/wuha-io/river/blob/master/docs/processes/head.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/head.js)
* complement [doc](https://github.com/wuha-io/river/blob/master/docs/processes/complement.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/complement.js)
* each [doc](https://github.com/wuha-io/river/blob/master/docs/processes/each.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/each.js)
* dropRepeats [doc](https://github.com/wuha-io/river/blob/master/docs/processes/dropRepeats.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/dropRepeats.js)
* count [doc](https://github.com/wuha-io/river/blob/master/docs/processes/count.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/count.js)
* round [doc](https://github.com/wuha-io/river/blob/master/docs/processes/round.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/round.js)
* log [doc](https://github.com/wuha-io/river/blob/master/docs/processes/log.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/log.js)
* spread [doc](https://github.com/wuha-io/river/blob/master/docs/processes/spread.md) | [source](https://github.com/wuha-io/river/blob/master/src/processes/spread.js)

## Roadmap

  - Implement all the tests
  - Make documentation
  - Implement sources (Elasticsearch, File, JSON, SQLite...)
  - Implement some endpoints
  - Make a string grammar we can compile to JavaScript with River
