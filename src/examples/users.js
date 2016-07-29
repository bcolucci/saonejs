
import flow from '../flow'
import log from '../processes/log'
import filter from '../processes/filter'
import map from '../processes/map'
import buffer from '../processes/buffer'
import count from '../processes/count'
import cast from '../processes/cast'

import source from './fixtures/users'

const bufferedUsers = buffer({ chunkSize: 10 })(source.stream)

//log()(bufferedUsers)

const males = filter({ test: (user) => user.sex === 'male' })(bufferedUsers)
const females = filter({ test: (user) => user.sex === 'female' })(bufferedUsers)

const numberOfUsers = count()(bufferedUsers)

const logYoungFemales = flow(
  filter({ test: u => u.age < 21 })
  , map({ transform: u => Object.assign({}, u, { isVeryYoung: u.age <= 10 }) })
  , log())(females)

log()(males)

const logOfNumberOfUsers = log()(numberOfUsers)

//log()(logOfNumberOfUsers)

const castedAges = flow(
  map({ transform: u => u.age }),
  cast({ type: String })
)
//castedAges(stream).on('data', (age) => console.log(typeof age, age))

source.listen()
