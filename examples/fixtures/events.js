
import { sample, fillFromGenerator } from '../../src/utils/arrays'
import { continus } from '../../src/utils/generators'
import inMemoryStream from '../../src/streams/sources/inMemoryStream'

const eventTypes = [ 'searchBegin', 'searchEnd', 'mouseMove', 'mouseClick' ]
const randomEvent = (): string => sample(eventTypes)

const events = fillFromGenerator({ generator: continus(randomEvent), nbItems: 5000 })

const source = inMemoryStream(events)

export default source
