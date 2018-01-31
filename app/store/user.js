// app/store/user.js

import axios from 'axios';
import { dbUrl } from '../../App';


/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method, navigation) =>
   dispatch => {
     axios.post('http://172.16.21.76:8080/auth/login', { email, password })
      .then(res => {
        console.log('response from post is ', res.data)
        //dispatch(getUser(res.data))
      })
      .then(() => navigation.navigate('ListingForm'))
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

  }

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
