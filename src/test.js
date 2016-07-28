
import { pipe, reverse } from 'ramda'
import { sample, fillFromGenerator } from './utils/arrays'
import { continus } from './utils/generators'
import inMemoryStream from './streams/sources/inMemoryStream'
import log from './processes/log'
import filter from './processes/filter'
import map from './processes/map'
import buffer from './processes/buffer'
import count from './processes/count'
import spread from './processes/spread'

const Flow = pipe;

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

const { start, stream } = inMemoryStream(users);
const bufferedUsers = buffer({ size: 10 })(stream);

// log()(bufferedUsers);

const males = filter({ test: (user) => user.sex === 'male' })(bufferedUsers);
const females = filter({ test: (user) => user.sex === 'female' })(bufferedUsers);
// const { males, females } = spread({ filters: { 'males': (user) => user.sex === 'male', 'females': (user) => user.sex === 'female' }})(bufferedUsers);
const numberOfUsers = count()(bufferedUsers);

const logYoungFemales = Flow(
  filter({ test: u => u.age < 21 }),
  map({ transform: u => Object.assign({}, u, { isVeryYoung: u.age <= 10 }) }),
  log())(females);

log()(males);

const logOfNumberOfUsers = log()(numberOfUsers);
// log()(logOfNumberOfUsers);

start();
