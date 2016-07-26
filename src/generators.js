
import R from 'ramda'

const continus = function* (generate: Function) {
  while (true)
    yield generate()
}

const integers = () => {
  let iterations = 0
  return continus(() => iterations++)
}

const mathRandom = () => continus(Math.random)

const conditioned = (hasNext: Function) => (generator: Function) =>
  (function* () {
      const gen = generator()
      let iterations = 0
        , next = gen.next()
      while (hasNext({ value: next.value, iterations: iterations++ })) {
        yield next.value
        next = gen.next()
      }
  })()

const bounded = (boundedAttr: string) => (maxIterations: number) => (generator: Function) =>
  conditioned((iterator) => R.lt(iterator[boundedAttr], maxIterations))(generator)

const boundedByIterations = (maxIterations: number) => (generator: Function) => bounded('iterations')(maxIterations)(generator)
const boundedByValue = (maxValue: number) => (generator: Function) => bounded('value')(maxValue)(generator)

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
