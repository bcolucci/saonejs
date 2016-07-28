
# River.js

**in active development**

## Purpose

River goal is to provide a very simple way to create (work)flows of data (streams).
River is not another stream library but something to help you to work with streams eyes closed...

# Test it

    git clone https://github.com/wuha-io/river.git \
      && cd river \
      && npm install \
      && npm test

    # run an example
    sudo npm install -g babel-cli
    babel-node examples/users.js

## Examples

- [examples/users.js](https://github.com/wuha-io/river/blob/master/examples/users.js)
- [examples/events.js](https://github.com/wuha-io/river/blob/master/examples/events.js)

## Processes

  - [filter](https://github.com/wuha-io/river/blob/master/docs/filter.md)
  - [map](https://github.com/wuha-io/river/blob/master/docs/map.md)
  - [count](https://github.com/wuha-io/river/blob/master/docs/count.md)
  - [log](https://github.com/wuha-io/river/blob/master/docs/log.md)
  - [buffer](https://github.com/wuha-io/river/blob/master/docs/buffer.md)
  - [cast](https://github.com/wuha-io/river/blob/master/docs/cast.md)
  - [spread](https://github.com/wuha-io/river/blob/master/docs/spread.md)
  - [compact](https://github.com/wuha-io/river/blob/master/docs/compact.md)

## Todo

  - Implement all the tests
  - Implement sources (Elasticsearch, File, JSON, SQLite...)
  - Implement some endpoints
  - Make a string grammar we can compile to JavaScript with River
