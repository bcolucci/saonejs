'use strict';

var _flow = require('./flow');

var _flow2 = _interopRequireDefault(_flow);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _stream = require('./streams/stream');

var _stream2 = _interopRequireDefault(_stream);

var _elasticsearch = require('./streams/sources/elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _inMemoryArray = require('./streams/sources/inMemoryArray');

var _inMemoryArray2 = _interopRequireDefault(_inMemoryArray);

var _generator = require('./streams/sources/generator');

var _generator2 = _interopRequireDefault(_generator);

var _processes = require('./processes');

var P = _interopRequireWildcard(_processes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sources = {
  elasticsearch: _elasticsearch2.default,
  inMemoryArray: _inMemoryArray2.default,
  generator: _generator2.default
};

module.exports = {
  P: P,
  flow: _flow2.default,
  sources: sources,
  utils: _utils2.default,
  createStream: _stream2.default
};