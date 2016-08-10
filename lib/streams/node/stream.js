'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _ramda = require('ramda');

var _stream = require('stream');

var _shortid = require('shortid');

/**
 * Default onStream error function
 */
var defOnError = console.error.bind(console);

/**
 * Creates a Readable/Writable stream
 * @param {Function} transformer
 * @param {Function} onError = defOnError
 */

exports.default = function () {
  var transformer = arguments.length <= 0 || arguments[0] === undefined ? _ramda.identity : arguments[0];
  var onError = arguments.length <= 1 || arguments[1] === undefined ? defOnError : arguments[1];

  if (!(typeof transformer === 'function')) {
    throw new TypeError('Value of argument "transformer" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(transformer));
  }

  var stream = new _stream.Transform({ objectMode: true });
  // ex: BkfZWpEMUY36d3bef66acbe, rytWWaVG8Fca3919d95b10e...
  stream.id = (0, _shortid.generate)() + Math.random().toString(16).slice(2);
  stream._read = function () {};
  stream._write = function (chunk, _, callback) {
    stream.emit('data', transformer(chunk));
    callback();
  };
  stream.on('error', onError);
  return stream;
};

function _inspect(input, depth) {
  var maxDepth = 4;
  var maxKeys = 15;

  if (depth === undefined) {
    depth = 0;
  }

  depth += 1;

  if (input === null) {
    return 'null';
  } else if (input === undefined) {
    return 'void';
  } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return typeof input === 'undefined' ? 'undefined' : _typeof(input);
  } else if (Array.isArray(input)) {
    if (input.length > 0) {
      var _ret = function () {
        if (depth > maxDepth) return {
            v: '[...]'
          };

        var first = _inspect(input[0], depth);

        if (input.every(function (item) {
          return _inspect(item, depth) === first;
        })) {
          return {
            v: first.trim() + '[]'
          };
        } else {
          return {
            v: '[' + input.slice(0, maxKeys).map(function (item) {
              return _inspect(item, depth);
            }).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']'
          };
        }
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return 'Array';
    }
  } else {
    var keys = Object.keys(input);

    if (!keys.length) {
      if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
        return input.constructor.name;
      } else {
        return 'Object';
      }
    }

    if (depth > maxDepth) return '{...}';
    var indent = '  '.repeat(depth - 1);
    var entries = keys.slice(0, maxKeys).map(function (key) {
      return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
    }).join('\n  ' + indent);

    if (keys.length >= maxKeys) {
      entries += '\n  ' + indent + '...';
    }

    if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
      return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
    } else {
      return '{\n  ' + indent + entries + '\n' + indent + '}';
    }
  }
}