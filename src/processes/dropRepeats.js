
import { equals } from 'ramda'
import wrap from '../utils/wrap'

const dropRepeats = (write: Function, opts) => {

  let previous

  return {
    data: (data) => {
      if (previous !== undefined && opts.test(previous, data))
        return
      previous = data
      write(data)
    }
  }
}

export default (opts = { test: equals }): Function => wrap(dropRepeats, opts)
