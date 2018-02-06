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
    axios.get(dbUrl + '/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method, navigation) =>
   dispatch => {
     axios.post(dbUrl + '/auth/login', { email, password })
      .then(res => {
        dispatch(getUser(res.data))
      })
      .then(() => navigation.navigate('UserHome'))
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

  }

export const signup = (email, password, navigation, firstName, lastName) =>
  dispatch => {
    axios.post(dbUrl + '/auth/signup', { email, password, firstName, lastName })
     .then(res => {
       dispatch(getUser(res.data))
     })
     .then(() => navigation.navigate('Intro'))
     .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

 }

export const logout = (navigation) =>
  dispatch => {
    axios.post(dbUrl + '/auth/logout')
      .then(_ => {
        dispatch(removeUser());
      })
      .then(() => {
        navigation.navigate('Main')
      })
      .catch(err => console.log(err))
    }
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
