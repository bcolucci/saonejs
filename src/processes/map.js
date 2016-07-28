import wrap from '../utils/wrap';

const map = (write, opts) => {
  return {
    data: (data) => write(opts.transform(data))
  };
};

export default (opts = { transform: Function }): Function => wrap(opts, map);
