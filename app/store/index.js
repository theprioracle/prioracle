// app/store/index.js

import {createStore, combineReducers, applyMiddleware, createLogger} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import listings from './listings';
import user from './user';

const reducer = combineReducers({
  user,
  listings
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware
  //createLogger({collapsed: true})
));

const store = createStore(reducer, middleware);

export default store;
export * from './listings';
export * from  './user';