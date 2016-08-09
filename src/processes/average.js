
import { T, always, cond, equals } from 'ramda'
import wrap from '../utils/wrap'

const standard = (write) => {
  let count = 0
  let sum = 0
  return {
    data: (data) => {
      count++
      sum += data
      write(sum / count)
    }
  }
}

const stdDeviation = (write) => {
  let count = 0
  let sum = 0
  let sqr = 0
  return {
    data: (data) => {
      count++
      sum += data
      sqr += data * data
      const avg = sum / count
      write(Math.sqrt(sqr / count - avg * avg))
    }
  }
}

const average = (write: Function, opts) => cond([
  [ equals('std_deviation'), always(stdDeviation) ],
  [ T, always(standard) ]
])(opts.mode)(write)

export default (opts = { mode: String }): Function => wrap(average, opts)
