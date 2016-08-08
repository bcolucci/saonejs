
import { equals, contains, append } from 'ramda'
import wrap from '../utils/wrap'

const unique = (write: Function, opts) => {
  let seen = []
  const alreadySeen = data => seen.filter(cur => opts.equals(cur, data)).length > 0
  return {
    data: (data) => {
      if (alreadySeen(data))
        return
      seen = append(data, seen)
      write(data)
    }
  }
}

export default (opts = { equals }): Function => wrap(unique, opts)
