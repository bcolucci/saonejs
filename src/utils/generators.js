
import { always, lt } from 'ramda'

export const continus = (next: Function) => {
  return function* () {
    while (true)
      yield next()
  }
}

export const integers = () => {
  let i = 0
  return continus(() => i++)()
}

export const mathRandom = () => continus(Math.random)()

export const conditioned = (hasNext: Function): Function => (generator: Function) => {
  return function* () {
      const iterator = generator()
      let iterations = 0
        , cursor = iterator.next()
      while (hasNext({ value: cursor.value, iterations: iterations++ })) {
        yield cursor.value
        cursor = iterator.next()
      }
  }
}

export const bounded = (boundedAttr: string): Function =>
  (maxIterations: number): Function =>
    conditioned((iterator) => lt(iterator[boundedAttr], maxIterations))

export const boundedByIterations = (maxIterations: number): Function => bounded('iterations')(maxIterations)

export const boundedByValue = (maxValue: number): Function => bounded('value')(maxValue)
