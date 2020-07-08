import Cookie from 'js-cookie';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootreducers from './reducers/rootreducer';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {};

export const store = createStore(
  rootreducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
