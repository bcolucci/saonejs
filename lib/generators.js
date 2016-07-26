'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var continus = regeneratorRuntime.mark(function continus(generate) {
  return regeneratorRuntime.wrap(function continus$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (typeof generate === 'function') {
            _context.next = 2;
            break;
          }

          throw new TypeError('Value of argument "generate" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(generate));

        case 2:
          if (!true) {
            _context.next = 7;
            break;
          }

          _context.next = 5;
          return generate();

        case 5:
          _context.next = 2;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, continus, this);
});

var integers = function integers() {
  var iterations = 0;
  return continus(function () {
    return iterations++;
  });
};

var mathRandom = function mathRandom() {
  return continus(Math.random);
};

var conditioned = function conditioned(hasNext) {
  if (!(typeof hasNext === 'function')) {
    throw new TypeError('Value of argument "hasNext" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(hasNext));
  }

  return function (generator) {
    if (!(typeof generator === 'function')) {
      throw new TypeError('Value of argument "generator" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(generator));
    }

    return regeneratorRuntime.mark(function _callee() {
      var gen, iterations, next;
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              gen = generator();
              iterations = 0, next = gen.next();

            case 2:
              if (!hasNext({ value: next.value, iterations: iterations++ })) {
                _context2.next = 8;
                break;
              }

              _context2.next = 5;
              return next.value;

            case 5:
              next = gen.next();
              _context2.next = 2;
              break;

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee, this);
    })();
  };
};

var bounded = function bounded(boundedAttr) {
  return function (maxIterations) {
    if (!(typeof maxIterations === 'number')) {
      throw new TypeError('Value of argument "maxIterations" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(maxIterations));
    }

    return function (generator) {
      if (!(typeof generator === 'function')) {
        throw new TypeError('Value of argument "generator" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(generator));
      }

      return conditioned(function (iterator) {
        return _ramda2.default.lt(iterator[boundedAttr], maxIterations);
      })(generator);
    };
  };
};

var boundedByIterations = function boundedByIterations(maxIterations) {
  if (!(typeof maxIterations === 'number')) {
    throw new TypeError('Value of argument "maxIterations" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(maxIterations));
  }

  return function (generator) {
    if (!(typeof generator === 'function')) {
      throw new TypeError('Value of argument "generator" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(generator));
    }

    return bounded('iterations')(maxIterations)(generator);
  };
};
var boundedByValue = function boundedByValue(maxValue) {
  if (!(typeof maxValue === 'number')) {
    throw new TypeError('Value of argument "maxValue" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(maxValue));
  }

  return function (generator) {
    if (!(typeof generator === 'function')) {
      throw new TypeError('Value of argument "generator" violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(generator));
    }

    return bounded('value')(maxValue)(generator);
  };
};

if (!module.parent) {

  var g = continus(_ramda2.default.always(42));
  var i = 5;
  while (i--) {
    console.log(g.next());
  }g = integers();
  i = 5;
  while (i--) {
    console.log(g.next());
  }g = mathRandom();
  i = 5;
  while (i--) {
    console.log(g.next());
  }g = conditioned(function (_ref) {
    var value = _ref.value;
    return _ramda2.default.lt(value, 3);
  })(integers);
  i = 5;
  while (i--) {
    console.log(g.next());
  }g = bounded('iterations')(2)(integers);
  i = 5;
  while (i--) {
    console.log(g.next());
  }g = boundedByIterations(1)(integers);
  i = 5;
  while (i--) {
    console.log(g.next());
  }g = boundedByValue(0.9)(mathRandom);
  i = 10;
  while (i--) {
    console.log(g.next());
  }
}

exports.default = {
  continus: continus,
  integers: integers,
  mathRandom: mathRandom,
  conditioned: conditioned,
  bounded: bounded,
  boundedByIterations: boundedByIterations,
  boundedByValue: boundedByValue
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