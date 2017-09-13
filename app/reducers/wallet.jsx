import axios from 'axios'

//  STATE

const initialState = {
  wallet: 0
}

// ACTION TYPE CONSTANT

const GET_WALLET = 'GET_WALLET'

// ACTION CREATORS

const getWallet = wallet => ({
  type: GET_WALLET,
  wallet
})

// THUNKS

export const fetchWallet = wallet => dispatch =>
  axios
    .get('/api/blockchain/balance')
    .then(res => res.data)
    .then(wallet => {
      dispatch(getWallet(wallet))
    })
    .catch(err => console.log('fetch wallet error', err))

// REDUCER

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GET_WALLET:
    newState.wallet = action.wallet
    break
  default:
    return state
  }
  return newState
}
