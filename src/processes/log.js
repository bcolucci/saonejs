
import { pipe, identity } from 'ramda'
import wrap from '../utils/wrap'
import tappedPipe from '../utils/tappedPipe'

const log = (write: Function, opts) => {
  const wrappedLog = (data) => console.log.apply(console, [].concat(opts.template(data)))
  return {
    data: (data) => tappedPipe(wrappedLog, write)(data)
  }
}

export default (opts = { template: identity }): Function => wrap(log, opts)
