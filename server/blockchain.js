'use strict'

const { Transaction } = require('APP/db')

const Web3 = require('web3')
const contract = require('truffle-contract')
const _ = require('lodash')

const web3IP1 = "http://104.41.158.61:8545"
const web3IP2 = "http://52.177.185.225:8545"
const accountHash1 = '0xd3435971d3fe2b2d36e56ab2ff9b407f39fc4fef'
const accountHash2 = '0x5517d7713a812ee1d27f1a45ae737e6b821ebf9b'
const accountHash3 = "0xc6dee699194401598776386193d3422809cb0375"
const provider = new Web3.providers.HttpProvider(web3IP1)
const web3 = new Web3(provider)

var request = require('request')
// Other accounts START
const provider2 = new Web3.providers.HttpProvider(web3IP2)
const web3_2 = new Web3(provider2)

const provider3 = new Web3.providers.HttpProvider('http://localhost:8545')
const web3_3 = new Web3(provider3)

// const provider5 = new Web3.providers.HttpProvider('http://13.90.194.145:8545')
// const web3_5 = new Web3(provider5)

// const provider6 = new Web3.providers.HttpProvider('http://13.90.138.46:8545')
// const web3_6 = new Web3(provider6)
// Other acounts END

const { mustBeLoggedIn, forbidden } = require('./auth.filters')

const { User, Wallet } = require('APP/db')

module.exports = require('express')
  .Router()
  .get('/balance', (req, res, next) => {
    const balance = web3.eth.getBalance(web3.eth.accounts[0])
    const newBalance = balance / 1000000000000000000
    res.json(newBalance)
  })
  .get('/user', (req, res, next) => {
    res.json(web3.eth.accounts[0])
  })
  .get('/latest', (req, res, next) => {
    res.json(web3.eth.accounts[0])
  })
  .get('/blockRankings', (req, res, next) => {
    // get wallets for all addresses
    const walletAmount = [] // array to hold wallet info for all accounts

    const walletTwo =
      web3_2.eth.getBalance(accountHash2) / 1000000000000000000
    const walletThree =
      web3_3.eth.getBalance(web3_3.eth.accounts[0]) / 1000000000000000000
    const walletFour =
      web3.eth.getBalance(accountHash1) / 1000000000000000000
    // const walletFive =
    //   web3_5.eth.getBalance(web3_5.eth.accounts[0]) / 1000000000000000000
    // const walletSix =
    //   web3_6.eth.getBalance(web3_6.eth.accounts[0]) / 1000000000000000000

    // account two
    walletAmount.push({
      name: 'Stanley',
      hash: accountHash1,
      value: walletFour,
      color: '#8624aa'
    })
    // account three
    walletAmount.push({
      name: 'Ken',
      hash: accountHash2,
      value: walletTwo,
      color: '#fb8c00'
    })
     // account four
    // walletAmount.push({
    //   name: 'Sid',
    //   hash: '0x7a653128323e7c671b04c98527f210cf8f432000',
    //   value: walletFour,
    //   color: '#1e88e5'
    // })
    // // account five
    // walletAmount.push({
    //   name: 'Aatish',
    //   hash: '0x0f8c9d2864761aa9eb1ff8164c7dc8918eff0cea',
    //   value: walletFive,
    //   color: '#e53935'
    // })
    // // account six
    // walletAmount.push({
    //   name: 'Stanley',
    //   hash: '0x626aea11c00b20dca9bdd1fd90d09fd7215f3527',
    //   value: walletSix,
    //   color: '#3949ab'
    // })
    res.json(walletAmount)
  })
  .get('/currBlock', (req, res, next) => {
    res.json(web3.eth.blockNumber)
  })
  .post('/trans', (req, res, next) => {
    web3.personal.sendTransaction(
      {
        from: req.body.from,
        to: req.body.to,
        value: +req.body.value
      },
      'devpatel'
    )
  })
  // .post("/trans", (req, res, next) =>
  //   web3.personal.sendTransaction({
  //     from: "0x7a653128323e7c671b04c98527f210cf8f432000",
  //     to: "0x0f8c9d2864761aa9eb1ff8164c7dc8918eff0cea",
  //     value: 30000,
  //   }, "devpatel")
  // )
  .get('/codeWars', (req, res, next) => {
    request(
      'https://www.codewars.com/api/v1/users/aatish17varma?access_key=yqykhXWaJxT5yyXEf7tN',
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          res.send(body)
        }
      }
    )
  })
  .get('/timesCalledCodeWars', (req, res, next) => {
    console.log('reached get timesCalledCodeWars')
    User.findOne({
      where: { account: req.query.account }
    }).then(foundAccount => {
      console.log('Bit i am dog', foundAccount.timesCalledCodeWars)
      res.send(String(foundAccount.timesCalledCodeWars))
    })
  })
  .put('/timesCalledCodeWars', (req, res, next) => {
    User.findOne({ where: { account: req.body.account.account } })
      .then(foundAccount => {
        var newAmount = foundAccount.timesCalledCodeWars + 1
        var updatedAccount = foundAccount.update({
          timesCalledCodeWars: newAmount
        })
        return updatedAccount
      })
      .then(newAccount => {
        res.send(String(newAccount.timesCalledCodeWars))
      })
  })
  .get('/previousAmountOfPoints', (req, res, next) => {
    User.findOne({
      where: { account: req.query.account }
    }).then(foundAccount => {
      res.send(String(foundAccount.previousAmountOfCodeWarsPoints))
    })
  })
  .put('/previousAmountOfPoints', (req, res, next) => {
    User.findOne({ where: { account: req.body.account } })
      .then(foundAccount => {
        console.log('old amount', foundAccount.previousAmountOfCodeWarsPoints)
        var updatedAccount = foundAccount.update({
          previousAmountOfCodeWarsPoints:
            req.body.previousAmountOfCodeWarsPoints
        })
        return updatedAccount
      })
      .then(newAccount => {
        console.log('new amount', newAccount.previousAmountOfCodeWarsPoints)
        res.send(String(newAccount.previousAmountOfCodeWarsPoints))
      })
  })
  .get('/codeWarsStackCoinAmount', (req, res, next) => {
    User.findOne({
      where: { account: req.query.account }
    }).then(foundAccount => {
      res.send(String(foundAccount.codeWarsStackCoinAmount))
    })
  })
  .put('/codeWarsStackCoinAmount', (req, res, next) => {
    User.findOne({ where: { account: req.body.account } })
      .then(foundAccount => {
        var newAmount = foundAccount.codeWarsStackCoinAmount + 100
        var updatedAccount = foundAccount.update({
          codeWarsStackCoinAmount: newAmount
        })
        return updatedAccount
      })
      .then(newAccount => {
        res.send(String(newAccount.codeWarsStackCoinAmount))
      })
  })
