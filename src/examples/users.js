
import flow from '../flow'
import * as P from '../processes'

import source from './fixtures/users'

const bufferedUsers = P.buffer({ chunkSize: 10 })(source.stream)

const males = P.filter({ test: (user) => user.sex === 'male' })(bufferedUsers)
const females = P.filter({ test: (user) => user.sex === 'female' })(bufferedUsers)

const numberOfUsers = P.count()(bufferedUsers)

const logYoungFemales = flow(
  P.filter({ test: u => u.age < 21 }),
  P.map({ transform: u => Object.assign({}, u, { isVeryYoung: u.age <= 10 }) }),
  P.log()
)(females)

P.log()(males)

const logOfNumberOfUsers = P.log()(numberOfUsers)
//P.log()(logOfNumberOfUsers)

const castedAges = flow(
  P.map({ transform: u => u.age }),
  P.cast({ type: String })
)
//castedAges(stream).on('data', (age) => console.log(typeof age, age))

source.listen()
