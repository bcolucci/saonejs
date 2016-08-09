'use strict';

var _processes = require('./processes');

var P = _interopRequireWildcard(_processes);

var _flow = require('./flow');

var _flow2 = _interopRequireDefault(_flow);

var _stream = require('./streams/stream');

var _stream2 = _interopRequireDefault(_stream);

var _elasticsearch = require('./streams/sources/elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var sources = { elasticsearch: _elasticsearch2.default };

module.exports = {
  P: P,
  flow: _flow2.default,
  sources: sources,
  createStream: _stream2.default
};