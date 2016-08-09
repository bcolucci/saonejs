"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * @param {Array} arr The input array
 * @returns {*} A random object from the input array
 */
var sample = exports.sample = function sample(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Value of argument \"arr\" violates contract.\n\nExpected:\nArray\n\nGot:\n" + _inspect(arr));
  }

  return arr[Math.floor(Math.random() * arr.length)];
};

var fillFromGenerator = exports.fillFromGenerator = function fillFromGenerator() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? { generator: Function, nbItems: number } : arguments[0];
  var generator = opts.generator;
  var nbItems = opts.nbItems;

  var iterator = generator();
  var accumulator = function accumulator() {
    var arr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    function _ref2(_id2) {
      if (!Array.isArray(_id2)) {
        throw new TypeError("Function return value violates contract.\n\nExpected:\nArray\n\nGot:\n" + _inspect(_id2));
      }

      return _id2;
    }

    if (!Array.isArray(arr)) {
      throw new TypeError("Value of argument \"arr\" violates contract.\n\nExpected:\nArray\n\nGot:\n" + _inspect(arr));
    }

    if (arr.length === nbItems) return arr;
    arr.push(iterator.next().value);
    return _ref2(accumulator(arr));
  };
  return accumulator();
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
    return typeof input === "undefined" ? "undefined" : _typeof(input);
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

      if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
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