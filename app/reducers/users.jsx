import axios from 'axios'

//  STATE

const initialState = {
  users: [],
  user: {}
}

// ACTION TYPE CONSTANT

const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_USER = 'GET_USER'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'

// ACTION CREATORS
const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

const getUser = user => ({
  type: GET_USER,
  user
})

const addUser = user => ({
  type: ADD_USER,
  user
})

const removeUser = user => ({
  type: REMOVE_USER,
  user
})

// THUNKS

export const fetchAllUsers = () => dispatch =>
  axios
    .get('/api/users')
    .then(res => res.data)
    .then(users => {
      dispatch(getAllUsers(users))
    })
    .catch(err => console.log('fetch all users error', err))

export const fetchUser = userId => dispatch =>
  axios
    .get(`/api/users/${userId}`)
    .then(res => res.data)
    .then(user => {
      dispatch(getUser(user))
    })
    .catch(err => console.log('fetch user error', err))

export const postUser = user => dispatch =>
  axios
    .post('/api/users', user)
    .then(res => res.data)
    .then(newUser => {
      dispatch(addUser(newUser))
    })
    .catch(err => console.log('post users error', err))

export const deleteUser = userId => dispatch =>
  axios
    .delete(`/api/users/${userId}`)
    .then(res => res.data)
    .then(user => {
      dispatch(removeUser(user))
    })
    .catch(err => console.log('delete users error', err))

// REDUCER

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GET_ALL_USERS:
    newState.users = action.users
    break
  case GET_USER:
    newState.user = action.user
    break
  case ADD_USER:
    newState.users = [...newState.users, action.user]
    break
  case REMOVE_USER:
    newState.users = newState.users.filter(user => {
      if (user.id !== action.user.id) return user
    })
    break
  default:
    return state
  }
  return newState
}
