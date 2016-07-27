
import readable from '../streams/readable'
import generators from './generators'

export const generatorStream =
  (generator: Function, opts = { nextTick: Function = process.nextTick}): Readable => {

    const iterator = generator()

    const stream = readable()
    stream._read = () => {}

    const nextChunk = () => {
      const cursor = iterator.next()
      if (cursor.done)
        return stream.emit('end')
      stream.emit('data', cursor.value)
      //TODO make it more flexible (i.e. if user want to use setInterval/clearInterval)
      opts.nextTick(nextChunk)
    }

    nextChunk()

    return stream
}

export const mathRandom = () => generatorStream(generators.mathRandom)

if (!module.parent) {

  //mathRandom()
  //  .on('data', console.log)

  const fiveMathRandom = () => generators.boundedByIterations(5)(generators.mathRandom)

  /*const it = fiveMathRandom()
  let i = 6
  while (i--)
    console.log(it.next())
  */

  generatorStream(fiveMathRandom)
    .on('data', console.log)
    .on('end', () => console.log('end of fiveMathRandom stream'))

}
