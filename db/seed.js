'use strict'

const db = require('APP/db'),
  { User, Wallet, Transaction, Promise } = db,
  { mapValues } = require('lodash')

function seedEverything() {
  const seeded = {
    users: users()
  }

  seeded.wallets = wallets(seeded)
  seeded.transactions = transactions(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  god: {
    email: 'stanley@gmail.com',
    ip: '104.41.158.61',
    first_name: 'Stanley',
    last_name: 'Tiu',
    password: 'devpatel',
    account: '0xd3435971d3fe2b2d36e56ab2ff9b407f39fc4fef',
    code_wars: '',
    timesCalledCodeWars: 0,
    previousAmountOfCodeWarsPoints: 0,
    codeWarsStackCoinAmount: 100,
    img:
      'http://www.trbimg.com/img-588768dc/turbine/la-et-hc-actor-dev-patel-20170124'
  },
  ken: {
    email: 'ken@gmail.com',
    ip: '52.177.185.225',
    first_name: 'Ken',
    last_name: 'Russo',
    password: 'devpatel',
    account: '0x5517d7713a812ee1d27f1a45ae737e6b821ebf9b',
    code_wars: '',
    timesCalledCodeWars: 0,
    previousAmountOfCodeWarsPoints: 0,
    codeWarsStackCoinAmount: 100,
    img:
      'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAxgAAAAJGQzODQ5NGQwLTk1OTEtNGY0OC05ZmYyLTg0YmRmN2RhZTYxNg.jpg'
  }
})

const wallets = seed(Wallet, ({ users }) => ({
  god: {
    user_id: users.god.id,
    amt: 9999999999
  },
  ken: {
    user_id: users.ken.id,
    amt: 0
  }
}))

const transactions = seed(Transaction, ({ users }) => ({
  god: {
    user_id: users.god.id,
    tx_hash: ''
  },
  ken: {
    user_id: users.ken.id,
    tx_hash: ''
  }
}))

if (module === require.main) {
  db.didSync
    .then(() =>
      db.sync({
        force: true
      })
    )
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(
      this.row,
      0,
      2
    )}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others = {}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(
          others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other
        )
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows =>
        Promise.props(
          Object.keys(rows)
            .map(key => {
              const row = rows[key]
              return {
                key,
                value: Promise.props(row).then(row =>
                  Model.create(row).catch(error => {
                    throw new BadRow(key, row, error)
                  })
                )
              }
            })
            .reduce(
              (all, one) =>
                Object.assign({}, all, {
                  [one.key]: one.value
                }),
              {}
            )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      })
      .catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {
  users,
  wallets,
  transactions
})
