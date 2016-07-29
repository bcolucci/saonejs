import R from 'ramda';
import wrap from '../utils/wrap'
import tappedPipe from '../utils/tappedPipe'

const log = (write: Function, opts) => {
  const wrappedLog = R.pipe(opts.template, console.log);

  return {
    data: (data) => tappedPipe(wrappedLog, write)(data)
  }
}

export default (opts = { template: R.identity }): Function => wrap(log, opts)
