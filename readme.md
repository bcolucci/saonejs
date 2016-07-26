
# River.js

```javascript
import rv from 'river'

const { log } = rv.console

const count = rv.count()

const users = rv.jsonSource('./users.json')

log(users) // print each user as it
log(rv.map(u => `user ${u.name}`)(users)) // print 'user brice', 'user blabla'...

const names = rv.prop('name')
const getNamesAndLogThem = rv.compose(names, log)

getNamesAndLogThem(users)

// rv.prop('name') <=> attr => x => x[attr]
rv.compose(rv.prop('name'), log)(users) // print only the names

const spreadByGender = rv.spread(rv.prop('gender'), { map: { males: 'm', females: 'f' }})

// rv.categorize eq. to an unbounded rv.spread

const usersByGender = spreadByGender(users)

const { males, females } = usersByGender  // => males: stream of male users, females: stream of female users
const streamOfAgeStreams = rv.categorize(rv.prop('age'))(users) // => ages: stream of streams of ages (stream<stream<1 year olds>, stream<2 year olds>, stream<10 year olds>>)
const streamOfNumberOfPeopleWithAge = rv.each(count)(streamOfAgeStreams) // number of people in each stream in streamOfAgeStreams (i.e. stream<stream<number of 1 year olds>, stream<number of 2 year olds>>)
const numberOfDifferentAges = count(streamOfAgeStreams) // number of streams in streamOfAgeStreams (i.e. number of different ages)

log(streamOfAgeStreams) // => stream, stream, stream
rv.each(log)(streamOfAgeStreams) // => 1, 2, 3, 4, .. , 21, 22 ...
rv.each(rv.compose(rv.map(i => `i=${i}`), log))(streamOfAgeStreams)

rv.compose(rv.prop('name'), rv.map(name => `this is a male: ${name}`), log)(males)

const nbMalesAndNbFemales = count(usersByGender)
nbMalesAndNbFemales.males // 5

users.listen()
```
