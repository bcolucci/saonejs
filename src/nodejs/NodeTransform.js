
import R from 'ramda'
import { Transform } from 'stream'

export default class NodeTransform extends Transform {

  fn: Function

  constructor(params = {}) {
    super(Object.assign({}, params, { objectMode: true }))
    this.fn = params.fn || R.identity
  }

  _write(chunk, encoding, cbk) {
    this.emit('data', this.fn(chunk))
    cbk()
  }

  _read() {
  }

}
