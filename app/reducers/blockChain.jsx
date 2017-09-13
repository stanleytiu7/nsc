import axios from 'axios'

//  STATE

const initialState = {
  transactions: 0,
  amounts: []
}

// ACTION TYPE CONSTANT

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_STACK_COIN_AMOUNTS = 'GET_STACK_COIN_AMOUNTS'

// ACTION CREATORS

const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

const getStackCoinAmounts = amounts => ({
  type: GET_STACK_COIN_AMOUNTS,
  amounts
})

// THUNKS

export const fetchTransactions = transaction => dispatch =>
  axios
    .get('/api/blockchain/currBlock')
    .then(res => res.data)
    .then(transactions => {
      dispatch(getTransactions(transactions))
    })
    .catch(err => console.log('fetch transactions error', err))

export const fetchStackCoinAmounts = amounts => dispatch =>
  axios
    .get('/api/blockchain/blockRankings')
    .then(res => res.data)
    .then(amounts => {
      dispatch(getStackCoinAmounts(amounts.map(user => {return {name: user.name, value: user.value}})))
    })
    .catch(err => console.log('fetch amounts error', err))

// REDUCER

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GET_TRANSACTIONS:
    newState.transactions = action.transactions
    break
  case GET_STACK_COIN_AMOUNTS: 
    newState.amounts = action.amounts 
    break
  default:
    return state
  }
  return newState
}
