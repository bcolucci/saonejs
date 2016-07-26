'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generators = require('./generators');

var _generators2 = _interopRequireDefault(_generators);

var _sources = require('./sources');

var _ConsoleLog = require('./processes/ConsoleLog');

var _Spread2 = require('./processes/Spread');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _InMemorySource = (0, _sources.InMemorySource)();
// import { Count } from './processes/Count';


// const Readable = require('stream').Readable;
// const Transform = require('stream').Transform;

// class MyReadable extends Readable {
//   constructor(params) {
//     super(Object.assign({}, params, { objectMode: true }));
//   }
//   _read(size) {
//   }
// }

// class MyTransform extends Transform {
//   constructor(params) {
//     super(Object.assign(params, { objectMode: true }));

//     this.name = params.name;
//     this.field = params.field;
//     this.type = params.type;
//   }

//   _write(chunk, encoding, callback) {
//     let value = chunk;

//     if(this.type === 'console') {
//       console.log(value);
//     } else if(this.type === 'firstLetter') {
//       value = chunk[0];
//     } else {
//       value = this.field ? chunk[this.field] : chunk;
//     }

//     this.emit('data', value);
//     callback();
//   }

//   _read() {
//   }
// }

// const Source = function(params) {
//   let data = [{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'}];
//   let readable = new MyReadable();
//   let transform = new MyTransform({ name: 'source' });

//   readable.pipe(transform);

//   return {
//     stream: transform,
//     start: () => {
//       setInterval(() => {
//         if(data.length) {
//           readable.push(data.shift());
//         } else {
//           readable.push(null);
//         }
//       }, 1000);
//     }
//   };
// };


// const MyMap = function(params) {
//   let transform = new MyTransform({ name: 'map', field: 'sex' });
//   return (stream) => stream.pipe(transform);
// }

// const ConsoleLog = function(params) {
//   let transform = new MyTransform({ name: 'consolelog', type: 'console' });
//   return (stream) => stream.pipe(transform);
// };

// const FirstLetter = function(params) {
//   let transform = new MyTransform({ name: 'firstLetter', type: 'firstLetter' });
//   return (stream) => stream.pipe(transform);
// }

var stream = _InMemorySource.stream;
var start = _InMemorySource.start;
// const countStream = Count()(stream);

var _Spread = (0, _Spread2.Spread)({ field: 'sex', map: { males: 'male', females: 'female' } })(stream);

var males = _Spread.males;
var females = _Spread.females;

// ConsoleLog()(males);

(0, _ConsoleLog.ConsoleLog)()(females);

start();

// const s = Source();
// const SourceStream = s.stream;


// const MapStream = MyMap({ field: 'sex' })(SourceStream);

// const ConsoleLogStream = ConsoleLog()(MapStream);
// const FirstLetterStream = FirstLetter()(MapStream);

// const ConsoleLogStreamForFirstLetter = ConsoleLog()(FirstLetterStream);

// s.start();

exports.default = {
  generators: _generators2.default
};