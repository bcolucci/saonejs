
import { sample, fillFromGenerator } from './utils/arrays'
import { continus } from './utils/generators'
import inMemoryStream from './streams/sources/inMemoryStream'
import log from './processes/log'
import filter from './processes/filter'
import map from './processes/map'
import spread from './processes/spread'

const genders = [ 'male', 'female' ]
const randomGender = (): string => sample(genders)
const randomAge = (): number => Math.floor(Math.random() * 99)
const randomUser = () => Object.assign({}, {
  sex: randomGender(),
  age: randomAge()
})

const users = fillFromGenerator({
  generator: continus(randomUser),
  nbItems: 5000
})

const { stream, start } = inMemoryStream(users)
const { males, females } = spread({
  field: 'sex',
  map: { males: 'male', females: 'female' }
})(stream)

let youngFemales = filter({ test: f => f.age < 21 })(females)
youngFemales = map({ transform: f => Object.assign({}, f, { isVeryYoung: f.age <= 10 }) })(youngFemales)

log()(youngFemales)

start()
