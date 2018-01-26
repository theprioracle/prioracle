// app/store/listings.js

import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_LISTINGS = 'GET_LISTINGS';

/**
 * INITIAL STATE
 */
const defaultListings = [];

/**
 * ACTION CREATORS
 */
const getListingsAction = (listings) => (
  {type: GET_LISTINGS, listings}
);

/**
 * THUNK CREATORS
 */
// TODO: Initial testing for redux, change URL later
export const fetchListings = function() {
  return function thunk(dispatch) {
    return axios.get('http://172.16.23.244:8080/api/users')
      .then(res => res.data)
      .then(listings => dispatch(getListingsAction(listings)))
      .catch(err => console.log(err));
  }
}

/**
 * REDUCER
 */
export default function (state = defaultListings, action) {
  switch (action.type) {
    case GET_LISTINGS:
      return action.listings;
    default:
      return state;
  }
}
