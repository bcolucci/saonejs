
import { T, always, equals, cond } from 'ramda'
import wrap from '../utils/wrap'

const standard = test => write => {
  let cur
  return {
    data: (data) => {
      if (cur === undefined || test(data, cur))
        cur = data
      write(cur)
    }
  }
}

const amortized = test => write => {
  let cur
  let amortized = 0
  let count = 0
  return {
    data: (data) => {
      count++
      const amValue = data + count
      if (cur === undefined || test(amValue, amortized)) {
        cur = data
        amortized = amValue
      }
      write(cur)
    }
  }
}

const modeFn = test => cond([
  [ equals('amortized'), always(amortized(test)) ],
  [ T, always(standard(test)) ]
])

export const min = (opts = { mode: String }): Function =>
  wrap((write: Function, opts) => modeFn((v, cur) => cur > v)(opts.mode)(write), opts)

export const max = (opts = { mode: String }): Function =>
  wrap((write: Function, opts) => modeFn((v, cur) => cur < v)(opts.mode)(write), opts)
