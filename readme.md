
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

* [frequency.md](https://github.com/wuha-io/river/blob/master/docs/processes/frequency.md)
* [categorize.md](https://github.com/wuha-io/river/blob/master/docs/processes/categorize.md)
* [compactWithChunk.md](https://github.com/wuha-io/river/blob/master/docs/processes/compactWithChunk.md)
* [map.md](https://github.com/wuha-io/river/blob/master/docs/processes/map.md)
* [buffer.md](https://github.com/wuha-io/river/blob/master/docs/processes/buffer.md)
* [cast.md](https://github.com/wuha-io/river/blob/master/docs/processes/cast.md)
* [tick.md](https://github.com/wuha-io/river/blob/master/docs/processes/tick.md)
* [values.md](https://github.com/wuha-io/river/blob/master/docs/processes/values.md)
* [flatten.md](https://github.com/wuha-io/river/blob/master/docs/processes/flatten.md)
* [compact.md](https://github.com/wuha-io/river/blob/master/docs/processes/compact.md)
* [between.md](https://github.com/wuha-io/river/blob/master/docs/processes/between.md)
* [unique.md](https://github.com/wuha-io/river/blob/master/docs/processes/unique.md)
* [filter.md](https://github.com/wuha-io/river/blob/master/docs/processes/filter.md)
* [head.md](https://github.com/wuha-io/river/blob/master/docs/processes/head.md)
* [complement.md](https://github.com/wuha-io/river/blob/master/docs/processes/complement.md)
* [each.md](https://github.com/wuha-io/river/blob/master/docs/processes/each.md)
* [dropRepeats.md](https://github.com/wuha-io/river/blob/master/docs/processes/dropRepeats.md)
* [count.md](https://github.com/wuha-io/river/blob/master/docs/processes/count.md)
* [round.md](https://github.com/wuha-io/river/blob/master/docs/processes/round.md)
* [log.md](https://github.com/wuha-io/river/blob/master/docs/processes/log.md)
* [spread.md](https://github.com/wuha-io/river/blob/master/docs/processes/spread.md)

## Roadmap

  - Implement all the tests
  - Make documentation
  - Implement sources (Elasticsearch, File, JSON, SQLite...)
  - Implement some endpoints
  - Make a string grammar we can compile to JavaScript with River
