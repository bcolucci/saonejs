import wrap from '../utils/wrap';
import R from 'ramda';

const buffer = (write, opts) => {
  let buffer = [];

  return {
    data: (data) => {
      buffer = buffer.concat(data);

      if(buffer.length === opts.size) {
        while(buffer.length) {
          write(R.head(buffer));
          buffer = R.drop(1, buffer);
        }

        console.log('----');
      }
    }
  };
};

export default (opts = { size: 10 }): Function => wrap(opts, buffer);