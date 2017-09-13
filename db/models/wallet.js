'use strict'

const {
  FLOAT
} = require('sequelize')

module.exports = db => db.define('wallets', {
  amount: FLOAT
})

module.exports.associations = (Wallet, {
  User
}) => {
  Wallet.belongsTo(User)
}
