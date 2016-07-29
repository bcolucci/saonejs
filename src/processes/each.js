import R from 'ramda';
import wrap from '../utils/wrap'

const each = (write: Function, opts: { each: Function }) => {
  return {
    data: (data) => {
      write(R.tap(opts.each(data)))
    }
  }
}

export default (opts = {}): Function => wrap(each, opts)
