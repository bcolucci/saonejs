
export const sample = (arr : Array) => arr[ Math.floor(Math.random() * arr.length) ]

export const fillFromGenerator = (opts = { generator: Function, nbItems: number }): Array => {
  const iterator = opts.generator()
  const accumulator = (arr: Array = []): Array => {
    if (arr.length === opts.nbItems)
      return arr
    arr.push(iterator.next().value)
    return accumulator(arr)
  }
  return accumulator()
}
