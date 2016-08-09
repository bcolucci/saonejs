'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boundedByValue = exports.boundedByIterations = exports.bounded = exports.conditioned = exports.mathRandom = exports.integers = exports.continus = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _ramda = require('ramda');

var continus = exports.continus = function continus(next) {
  if (!(typeof next === 'function')) {
    throw new TypeError('Value of argument "next" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(next));
  }

  return regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!true) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return next();

          case 3:
            _context.next = 0;
            break;

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
};

var integers = exports.integers = function integers() {
  var i = 0;
  return continus(function () {
    return i++;
  })();
};

var mathRandom = exports.mathRandom = function mathRandom() {
  return continus(Math.random)();
};

var conditioned = exports.conditioned = function conditioned(hasNext) {
  function _ref(_id) {
    if (!(typeof _id === 'function')) {
      throw new TypeError('Function return value violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(_id));
    }

    return _id;
  }

  if (!(typeof hasNext === 'function')) {
    throw new TypeError('Value of argument "hasNext" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(hasNext));
  }

  return _ref(function (generator) {
    if (!(typeof generator === 'function')) {
      throw new TypeError('Value of argument "generator" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(generator));
    }

    return regeneratorRuntime.mark(function _callee2() {
      var iterator, iterations, cursor;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              iterator = generator();
              iterations = 0, cursor = iterator.next();

            case 2:
              if (!hasNext({ value: cursor.value, iterations: iterations++ })) {
                _context2.next = 8;
                break;
              }

              _context2.next = 5;
              return cursor.value;

            case 5:
              cursor = iterator.next();
              _context2.next = 2;
              break;

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    });
  });
};

var bounded = exports.bounded = function bounded(boundedAttr) {
  if (!(typeof boundedAttr === 'string')) {
    throw new TypeError('Value of argument "boundedAttr" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(boundedAttr));
  }

  return function (maxIterations) {
    if (!(typeof maxIterations === 'number')) {
      throw new TypeError('Value of argument "maxIterations" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(maxIterations));
    }

    return conditioned(function (iterator) {
      return (0, _ramda.lt)(iterator[boundedAttr], maxIterations);
    });
  };
};

var boundedByIterations = exports.boundedByIterations = function boundedByIterations(maxIterations) {
  function _ref4(_id4) {
    if (!(typeof _id4 === 'function')) {
      throw new TypeError('Function return value violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(_id4));
    }

    return _id4;
  }

  if (!(typeof maxIterations === 'number')) {
    throw new TypeError('Value of argument "maxIterations" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(maxIterations));
  }

  return _ref4(bounded('iterations')(maxIterations));
};

var boundedByValue = exports.boundedByValue = function boundedByValue(maxValue) {
  function _ref5(_id5) {
    if (!(typeof _id5 === 'function')) {
      throw new TypeError('Function return value violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(_id5));
    }

    return _id5;
  }

  if (!(typeof maxValue === 'number')) {
    throw new TypeError('Value of argument "maxValue" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(maxValue));
  }

  return _ref5(bounded('value')(maxValue));
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