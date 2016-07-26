const Transform = require('stream').Transform;

export default class NodeTransform extends Transform {
  constructor(params) {
    super(Object.assign({}, params, { objectMode: true }));

    this.fn = params.fn;
  }

  _write(chunk, encoding, callback) {
    let value = chunk;

    if(this.fn) {
      value = this.fn(value);
    }

    this.emit('data', value);
    callback();
  }

  _read() {
  }
}