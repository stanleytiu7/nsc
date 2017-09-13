'use strict'

const {
  STRING
} = require('sequelize')

module.exports = db => db.define('transactions', {
  tx_hash: STRING
})

module.exports.associations = (Transacation, {
  User
}) => {
  Transacation.belongsTo(User)
}
