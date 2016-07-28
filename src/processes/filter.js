import wrap from '../utils/wrap';
import R from 'ramda';

const filter = (write, opts) => {
  return {
    data: (data) => R.when(opts.test, write)(data)
  };
};

export default (opts = { test: Function }): Function => wrap(opts, filter);