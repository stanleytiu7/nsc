'use strict'

const db = require('APP/db')
const { User, Wallet, Transaction } = require('APP/db')

const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express')
  .Router()
  .get(
    '/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    // forbidden('listing users is not allowed'),
    (req, res, next) =>
      User.findAll().then(users => res.json(users)).catch(next)
    // this is wrong because there are 4 sids for some reason
    // {include:[{model:Transaction},{model:Wallet}]}
  )
  .post('/', (req, res, next) =>
    User.create(req.body).then(user => res.status(201).json(user)).catch(next)
  )
  .get('/:id', mustBeLoggedIn, (req, res, next) =>
    User.findById(req.params.id).then(user => res.json(user)).catch(next)
  )
  .put('/checkin', (req, res, next) => {
    console.log('put ', req.body)
    User.update(
      {
        last_check_in: req.body.date
      },
      { where: { id: req.body.id } }
    )
      .then(user => res.status(200).send())
      .catch(next)
  })
  .get('/checkindate/:id', mustBeLoggedIn, (req, res, next) =>
    User.findById(req.params.id).then(user => res.status(200).json(user)).catch(next)
  )
