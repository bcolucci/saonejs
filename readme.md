
# River.js

**in active development**

## Purpose

River goal is to provide a very simple way to create (work)flows of data (streams).
River is not another stream library but something to help you to work with streams eyes closed...

[Read the documentation](https://github.com/wuha-io/river/blob/master/docs/)

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

## Todo

  - Implement all the tests
  - Documentate the code
  - Implement sources (Elasticsearch, File, JSON, SQLite...)
  - Implement some endpoints
  - Make a string grammar we can compile to JavaScript with River
