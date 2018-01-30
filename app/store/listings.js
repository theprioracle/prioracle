// app/store/listings.js

import axios from 'axios';
import { dbUrl } from '../../App';

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
export const fetchListings = function() {
  return function thunk(dispatch) {
    return axios.get(dbUrl + '/api/listings')
      .then(res => res.data)
      .then(listings => dispatch(getListingsAction(listings)))
      .catch(err => console.log(err));
  }
}

export const addListing = function(listing, navigation) {
  return function thunk(dispatch) {
    let newListing = null;
    
    return axios.post(dbUrl + '/api/listings', listing)
      .then(res => res.data)
      .then(createdListing => { 
        newListing = createdListing[0];
        dispatch(addListingAction(createdListing[0]));
      })
      .then(() => navigation.navigate('Analysis', { id: newListing.id }))
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
