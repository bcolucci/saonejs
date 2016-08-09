
import reduce from './reduce'
import wrap from '../utils/wrap'

export default (opts = { initialValue: 0 }): Function => reduce({
  reduce: (acc, n) => acc + n,
  initialValue: opts.initialValue
})
