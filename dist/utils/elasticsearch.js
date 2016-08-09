'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchStream = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _ramda = require('ramda');

var _stream = require('stream');

var searchStream = exports.searchStream = function searchStream(client, targetStream) {
  var streamOpts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  function _ref(_id) {
    if (!(typeof _id === 'function')) {
      throw new TypeError('Function return value violates contract.\n\nExpected:\nFunction\n\nGot:\n' + _inspect(_id));
    }

    return _id;
  }

  if (!(targetStream instanceof _stream.Stream)) {
    throw new TypeError('Value of argument "targetStream" violates contract.\n\nExpected:\nStream\n\nGot:\n' + _inspect(targetStream));
  }

  var size = streamOpts.size;
  var scroll = streamOpts.scroll;


  var sourceAttr = (0, _ramda.prop)('_source');

  var write = targetStream.write.bind(targetStream);
  var onError = function onError(err) {
    return targetStream.emit('error', err);
  };

  var handleResponse = function handleResponse(res, countBefore) {

    var total = res.hits.total;
    var countAfter = countBefore + res.hits.hits.length;

    res.hits.hits.map(sourceAttr).forEach(write);

    //console.log('Events so far:', countAfter)

    if (total !== countAfter) client.scroll({ scrollId: res._scroll_id, scroll: scroll }).then(function (res) {
      return handleResponse(res, countAfter);
    }).catch(onError);
  };

  return _ref(function (searchOpts) {
    client.search(Object.assign({ size: size }, searchOpts, { scroll: scroll })).then(function (res) {
      return handleResponse(res, 0);
    }).catch(onError);
    return targetStream;
  });
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