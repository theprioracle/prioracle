// app/store/listings.js

import axios from 'axios';
import history from '../history';

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
// TEMP: Initial testing for redux
export const fetchListings = function() {
  return function thunk(dispatch) {
    return axios.get('/api/listings')
      .then(res => res.data)
      .then(listings => console.log("Fetched listings:", listings));
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
