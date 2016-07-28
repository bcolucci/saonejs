import R from 'ramda';

export default (...fns) => {
  let taps = fns.map(fn => R.partial(R.tap, [ fn ]));
  return R.pipe.apply(null, taps);
};