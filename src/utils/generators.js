
import R from 'ramda'

const continus = function* (generate: Function): Generator {
  while (true)
    yield generate()
}

const integers = (): Generator => {
  let iterations = 0
  return continus(() => iterations++)
}

const mathRandom = (): Generator => continus(Math.random)

const conditioned = (hasNext: Function): Function =>
  (generator: Function): Generator =>
    (function* () {
        const iterator = generator()
        let iterations = 0
          , cursor = iterator.next()
        while (hasNext({ value: cursor.value, iterations: iterations++ })) {
          yield cursor.value
          cursor = iterator.next()
        }
    })()

const bounded = (boundedAttr: string): Function =>
  (maxIterations: number): Function =>
  (generator: Function): Generator =>
    conditioned((iterator) => R.lt(iterator[boundedAttr], maxIterations))(generator)

const boundedByIterations = (maxIterations: number): Function =>
  (generator: Function): Generator =>
    bounded('iterations')(maxIterations)(generator)

const boundedByValue = (maxValue: number): Function =>
  (generator: Function): Generator =>
    bounded('value')(maxValue)(generator)

//TODO extract to test dir
if (!module.parent) {

  let g = continus(R.always(42))
  let i = 5
  while (i--)
    console.log(g.next())

  g = integers()
  i = 5
  while (i--)
    console.log(g.next())

  g = mathRandom()
  i = 5
  while (i--)
    console.log(g.next())

  g = conditioned(({ value }) => R.lt(value, 3))(integers)
  i = 5
  while (i--)
    console.log(g.next())

  g = bounded('iterations')(2)(integers)
  i = 5
  while (i--)
    console.log(g.next())

  g = boundedByIterations(1)(integers)
  i = 5
  while (i--)
    console.log(g.next())

  g = boundedByValue(0.9)(mathRandom)
  i = 10
  while (i--)
    console.log(g.next())

}

export default {
  continus,
  integers,
  mathRandom,
  conditioned,
  bounded,
  boundedByIterations,
  boundedByValue
}
