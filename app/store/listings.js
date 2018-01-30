// app/store/listings.js

import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_LISTINGS = 'GET_LISTINGS';
const ADD_LISTING = 'ADD_LISTING';

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

const addListingAction = (listing) => (
  {type: ADD_LISTING, listing}
);

/**
 * THUNK CREATORS
 */
// TODO: Initial testing for redux, change URL later
export const fetchListings = function() {
  return function thunk(dispatch) {
    return axios.get('http://172.16.23.244:8080/api/listings')
      .then(res => res.data)
      .then(listings => dispatch(getListingsAction(listings)))
      .catch(err => console.log(err));
  }
}

export const addListing = function(listing) {
  return function thunk(dispatch) {
    return axios.post('http://172.16.23.244:8080/api/listings',listing)
      .then(res => res.data)
      .then(listing => dispatch(addListingAction(listing)))
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
    case ADD_LISTING:
      return [...state, action.listing];
    default:
      return state;
  }
}
