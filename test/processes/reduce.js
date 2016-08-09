
import { deepEqual } from 'assert'
import { reduce } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/reduce', () => {

  it('reduce a stream into one element', done => {
    const stream = createStream()
    const received = []
    const playerLevel = (avgPower, avgMana) => (player) => {
      let level = 1
      if (player.power > avgPower) level++
      if (player.mana > avgMana) level++
      if (player.power > 5 || player.mana > 5) level++
      if (level === 4) level++
      return level
    }
    const buildTeamStats = (teamStats, player) => {
      teamStats.players = [ ...teamStats.players, player ]
      teamStats.power = [ ...teamStats.power, player.power ]
      teamStats.mana = [ ...teamStats.mana, player.mana ]
      teamStats.avgPower = teamStats.power.reduce((acc, n) => acc + n) / teamStats.power.length
      teamStats.avgMana = teamStats.mana.reduce((acc, n) => acc + n) / teamStats.mana.length
      const level = playerLevel(teamStats.avgPower, teamStats.avgMana)
      teamStats.bestPlayers = [].concat(teamStats.players).sort((p1, p2) => level(p2) - level(p1))
      return teamStats
    }
    const initialValue = {
      players: [],
      power: [],
      mana: [],
      bestPlayers: [],
      avgPower: null,
      avgMana: null
    }
    reduce({ reduce: buildTeamStats, initialValue })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received.pop(), {
          players: [
            { name: 'Thorval', type: 'chaman', power: 4, mana: 3 },
            { name: 'Zuplo', type: 'caster', power: 2, mana: 5 },
            { name: 'Argarith', type: 'warlord', power: 7, mana: 2 },
            { name: 'Ostaf', type: 'warlord', power: 6, mana: 3 },
            { name: 'Zebulin', type: 'caster', power: 1, mana: 6 },
            { name: 'Opronoth', type: 'warlord', power: 8, mana: 1 }
          ],
          power: [ 4, 2, 7, 6, 1, 8 ],
          mana: [ 3, 5, 2, 3, 6, 1 ],
          bestPlayers: [
            { name: 'Argarith', type: 'warlord', power: 7, mana: 2 },
            { name: 'Ostaf', type: 'warlord', power: 6, mana: 3 },
            { name: 'Zebulin', type: 'caster', power: 1, mana: 6 },
            { name: 'Opronoth', type: 'warlord', power: 8, mana: 1 },
            { name: 'Zuplo', type: 'caster', power: 2, mana: 5 },
            { name: 'Thorval', type: 'chaman', power: 4, mana: 3 }
          ],
          avgPower: 4.666666666666667,
          avgMana: 3.3333333333333335
        })
        done()
      })
    const players = [
      { name: 'Thorval', type: 'chaman', power: 4, mana: 3 },
      { name: 'Zuplo', type: 'caster', power: 2, mana: 5 },
      { name: 'Argarith', type: 'warlord', power: 7, mana: 2 },
      { name: 'Ostaf', type: 'warlord', power: 6, mana: 3 },
      { name: 'Zebulin', type: 'caster', power: 1, mana: 6 },
      { name: 'Opronoth', type: 'warlord', power: 8, mana: 1 }
    ]
    players.forEach(p => stream.write(p))
    stream.emit('end')
  })

})
