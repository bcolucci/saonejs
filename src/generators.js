
import R from 'ramda'

const integerGenerator = function* (max?: number = 0) {
  const next = R.ifElse(R.equals(0), R.T, R.gt)(max)
  let n = 0
  while (next(n))
    yield n++
}

if (!module.parent) {

  let n = integerGenerator(2)
  let i = 5
  while (i--)
    console.log(n.next().value)

}
