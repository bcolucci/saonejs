'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamGenerator = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _stream = require('stream');

var _generators = require('./generators');

var _stream2 = require('../streams/stream');

var _stream3 = _interopRequireDefault(_stream2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var streamGenerator = exports.streamGenerator = function streamGenerator(generator) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {
    autostart: Boolean = true,
    nextTick: Function = process.nextTick
  } : arguments[1];

  function _ref(_id) {
    if (!(_id instanceof _stream.Transform)) {
      throw new TypeError('Function return value violates contract.\n\nExpected:\nTransform\n\nGot:\n' + _inspect(_id));
    }

    return _id;
  }

  if (!(typeof generator === 'function')) {
    throw new TypeError('Value of argument "generator" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(generator));
  }

  var stream = (0, _stream3.default)();

  stream.start = function () {
    var _this = this;

    var iterator = generator();
    var flush = function flush() {
      var cursor = iterator.next();
      if (cursor.done) return _this.emit('end');
      _this.emit('data', cursor.value);
    };
    var ctx = setInterval(flush, 0);
    this.on('end', function () {
      return clearInterval(ctx);
    });
  };

  if (opts.autostart) stream.start();

  return _ref(stream);
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