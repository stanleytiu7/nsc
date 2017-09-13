import axios from 'axios'

const GET_TIMES_CODEWARS_CALLED = 'GET_TIMES_CODEWARS_CALLED'

const ADD_TIMES_CODEWARS_CALLED = 'ADD_TIMES_CODEWARS_CALLED'

export function getTimesCalled(times) {
  return {
    type: GET_TIMES_CODEWARS_CALLED,
    times
  }
}

export function addTimesCalled(times) {
  return {
    type: ADD_TIMES_CODEWARS_CALLED,
    times
  }
}

export default function reduce(times = 0, action) {
  switch (action.type) {
  case GET_TIMES_CODEWARS_CALLED:
    return action.times // dont need to indicate
    break
  case ADD_TIMES_CODEWARS_CALLED:
    return action.times // dont need to indicate
    break
  default:
    return times
  }
}

export function addTimesVisited(userAccount) {
  return function(dispatch) {
    return axios
      .put('/api/blockchain/timesCalledCodeWars', { account: userAccount })
      .then(res => res.data)
      .then(timeCodeWarsCalled => {
        var addTimes = addTimesCalled(timeCodeWarsCalled)
        return dispatch(addTimes)
      })
  }
}

export function getTimesVisited(userAccount) {
  return function(dispatch) {
    console.log('Reached GetTimes Visited Thunk')
    return axios
      .get('/api/blockchain/timesCalledCodeWars', {
        params: {
          account: userAccount
        }
      })
      .then(res => res.data)
      .then(amountOfTimesCalled => {
        console.log(
          'Times called in getTimesVisited thunk ',
          amountOfTimesCalled
        )
        var getAllTimesCalled = getTimesCalled(amountOfTimesCalled)
        return dispatch(getAllTimesCalled)
      })
      .catch(console.error)
  }
}
