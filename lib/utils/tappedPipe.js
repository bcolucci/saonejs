'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

exports.default = function () {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  var taps = fns.map(function (fn) {
    return (0, _ramda.partial)(_ramda.tap, [fn]);
  });
  return _ramda.pipe.apply(null, taps);
};