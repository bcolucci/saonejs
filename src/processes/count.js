import wrap from '../utils/wrap';

const count = (write, opts) => {
  let count = 0;

  return {
    data: (data) => {
      count = count + 1;
      write(count);
    }
  };
};

export default (opts = {}): Function => wrap(opts, count);
