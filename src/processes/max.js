
import { ifElse } from 'ramda'
import wrap from '../utils/wrap'

const standard = (write) => {
  let max = 0
  return {
    data: (data) => {
      if (max < data)
        max = data
      write(max)
    }
  }
}

const amortized = (write) => {
  let max = 0
  let amortized = 0
  let count = 0
  return {
    data: (data) => {
      count++
      const amValue = data + count
      if (amortized < amValue) {
        max = data
        amortized = amValue
      }
      write(max)
    }
  }
}

const max = (write: Function, opts) => ifElse(() => opts.amortized, amortized, standard)(write)

export default (opts = { amortized: false }): Function => wrap(max, opts)
