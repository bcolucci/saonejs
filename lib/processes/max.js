'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _ramda = require('ramda');

var _wrap = require('../utils/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var standard = function standard(write) {
  var max = 0;
  return {
    data: function data(_data) {
      if (max < _data) max = _data;
      write(max);
    }
  };
};

var amortized = function amortized(write) {
  var max = 0;
  var amortized = 0;
  var count = 0;
  return {
    data: function data(_data2) {
      count++;
      var amValue = _data2 + count;
      if (amortized < amValue) {
        max = _data2;
        amortized = amValue;
      }
      write(max);
    }
  };
};

var max = function max(write, opts) {
  if (!(typeof write === 'function')) {
    throw new TypeError('Value of argument "write" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(write));
  }

  return (0, _ramda.ifElse)(function () {
    return opts.amortized;
  }, amortized, standard)(write);
};

exports.default = function () {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? { amortized: false } : arguments[0];

  function _ref(_id) {
    if (!(typeof _id === 'function')) {
      throw new TypeError('Function return value violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(_id));
    }

    return _id;
  }

  return _ref((0, _wrap2.default)(max, opts));
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