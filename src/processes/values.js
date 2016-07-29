import R from 'ramda';
import wrap from '../utils/wrap';

const values = (write: Function, opts) => {
  return {
    data: (data) => {
      write(R.values(data))
    }
  }
}

export default (opts = {}): Function => wrap(values, opts)
