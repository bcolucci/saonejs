
export const sample = (arr : Array) => arr[ Math.floor(Math.random() * arr.length) ]

export const fillFromGenerator = (opts = { generator: Generator, nbItems: number }): Array => {
  const accumulator = (arr: Array = []): Array => {
    if (arr.length === opts.nbItems)
      return arr
    arr.push(opts.generator.next().value)
    return accumulator(arr)
  }
  return accumulator()
}
