
import R from 'ramda'

const buildGenerator = (iterator: Function, fn?: Function = R.identity) => {
  return function* () {
    const it = iterator()
    while (it.hasNext())
      yield fn(it.next())
  }
}

if (!module.parent) {

  const intIterator = () => {
    let i = 0
    //const generator = 
  }

}
