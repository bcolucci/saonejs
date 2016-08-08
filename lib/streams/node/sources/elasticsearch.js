'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = require('../../../utils/elasticsearch');

var _stream = require('../stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (clientOpts) {
  var searchOpts = arguments.length <= 1 || arguments[1] === undefined ? { index: index, type: type, body: { query: { match_all: {} } } } : arguments[1];
  var streamOpts = arguments.length <= 2 || arguments[2] === undefined ? { size: 500, scroll: '30s' } : arguments[2];


  var stream = (0, _stream2.default)();
  var client = new _elasticsearch.Client(clientOpts);

  var search = (0, _elasticsearch2.searchStream)(client, stream, streamOpts);

  return {
    stream: stream,
    listen: function listen() {
      return search(searchOpts);
    }
  };
};