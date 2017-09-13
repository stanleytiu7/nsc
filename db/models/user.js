'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs'),
  { STRING, VIRTUAL, INTEGER, DATE } = require('sequelize')


module.exports = db =>
  db.define(
    'users',
    {
      first_name: STRING,
      last_name: STRING,
      email: {
        type: STRING,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      ip: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      account: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      code_wars: {
        type: STRING,
        allowNull: true
      },
      previousAmountOfCodeWarsPoints: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      timesCalledCodeWars: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      codeWarsStackCoinAmount: {
        type: INTEGER,
        allowNull: false, 
        defaultValue: 0
      },
      img: {
        type: STRING,
        allowNull: true
      },
      last_check_in: {
        type: DATE,
        defaultValue : '1999-09-09 00:00:00-01'
      },
      //  We support oauth, so users may or may not have passwords.
      password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
      password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
    },
    {
      indexes: [
        {
          fields: ['email'],
          unique: true
        }
      ],
      hooks: {
        beforeCreate: setEmailAndPassword,
        beforeUpdate: setEmailAndPassword
      },
      defaultScope: {
        attributes: {
          exclude: ['password_digest']
        }
      },
      instanceMethods: {
        // This method is a Promisified bcrypt.compare
        authenticate(plaintext) {
          return bcrypt.compare(plaintext, this.password_digest)
        }
      }
    }
  )

module.exports.associations = (User, { OAuth, Wallet, Transaction }) => {
  User.hasOne(OAuth)
  User.hasOne(Wallet)
  User.hasOne(Transaction)
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt
    .hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
}
