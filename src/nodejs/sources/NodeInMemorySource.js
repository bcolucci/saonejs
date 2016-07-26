import { Readable } from 'stream';
import NodeTransform from '../NodeTransform';

class NodeReadable extends Readable {
  constructor(params) {
    super(Object.assign({}, params, { objectMode: true }));
  }

  _read() {

  }
}

export const getInMemorySource = function() {
  let data = [{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'},{'sex': 'male'}, {'sex': 'female'}, {'sex': 'male'}];
  let readable = new NodeReadable();
  let transform = new NodeTransform({});

  readable.pipe(transform);

  return {
    stream: transform,
    start: () => {
      setInterval(() => {
        if(data.length) {
          readable.push(data.shift());
        } else {
          readable.push(null);
        }
      }, 1000);
    }
  };
};