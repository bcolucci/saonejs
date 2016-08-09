'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pipe = require('./pipe');

var _pipe2 = _interopRequireDefault(_pipe);

var _tappedPipe = require('./tappedPipe');

var _tappedPipe2 = _interopRequireDefault(_tappedPipe);

var _wrap = require('./wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _arrays = require('./arrays');

var arrays = _interopRequireWildcard(_arrays);

var _elasticsearch = require('./elasticsearch');

var elasticsearch = _interopRequireWildcard(_elasticsearch);

var _generators = require('./generators');

var generators = _interopRequireWildcard(_generators);

var _streams = require('./streams');

var streams = _interopRequireWildcard(_streams);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  pipe: _pipe2.default,
  tappedPipe: _tappedPipe2.default,
  wrap: _wrap2.default,
  arrays: arrays,
  elasticsearch: elasticsearch,
  generators: generators,
  streams: streams
};