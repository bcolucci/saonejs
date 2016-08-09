
import { P, flow, sources, utils } from '../src'

const generator = utils.generators.boundedByIterations(50)(utils.generators.mathRandom)
const { stream, listen } = sources.generator(generator)

// log the random number, and log the current current total numbers
flow(P.log(), P.count(), P.log())(stream)

stream.on('end', () => console.log('End of the stream'))

listen()
