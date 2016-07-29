
/**
 * @param {Array} arr The input array
 * @returns {*} A random object from the input array
 */
export const sample = (arr: Array) => arr[ Math.floor(Math.random() * arr.length) ]

export const fillFromGenerator = (opts = { generator: Function, nbItems: number }): Array => {
  const { generator, nbItems } = opts
  const iterator = generator()
  const accumulator = (arr: Array = []): Array => {
    if (arr.length === nbItems)
      return arr
    arr.push(iterator.next().value)
    return accumulator(arr)
  }
  return accumulator()
}
