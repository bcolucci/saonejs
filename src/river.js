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

import { InMemorySource } from './sources';
import { ConsoleLog } from './processes/ConsoleLog';
// import { Count } from './processes/Count';
import { Spread } from './processes/Spread';

const { stream, start } = InMemorySource();
// const countStream = Count()(stream);

const { males, females } = Spread({ field: 'sex',  map: { males: 'male', females: 'female' }})(stream);


// ConsoleLog()(males);
ConsoleLog()(females);


start();

// const s = Source();
// const SourceStream = s.stream;


// const MapStream = MyMap({ field: 'sex' })(SourceStream);

// const ConsoleLogStream = ConsoleLog()(MapStream);
// const FirstLetterStream = FirstLetter()(MapStream);

// const ConsoleLogStreamForFirstLetter = ConsoleLog()(FirstLetterStream);

// s.start();