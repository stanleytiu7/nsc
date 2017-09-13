import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  codeWars: require('./codeWarsReducer').default,
  user: require('./users').default,
  wallet: require('./wallet').default,
  blockChain: require('./blockChain').default,
  codeWarsPreviousPoints: require('./codeWarsPreviousPointsReducer').default,
  codeWarsStackCoin: require('./codeWarsStackCoinReducer').default
})

export default rootReducer
