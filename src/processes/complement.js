import R from 'ramda';
import wrap from '../utils/wrap'

const each = (write: Function, opts: {}) => {

  let total = [];

  return {
    data: (data) => {
      let keys = R.keys(data);
      let difference = R.difference(keys, total);

      write(R.pick(difference, data));

      total = R.union(total, keys);
    }
  }
}

export default (opts = {}): Function => wrap(each, opts)
