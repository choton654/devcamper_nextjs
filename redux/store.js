import Cookie from 'js-cookie';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootreducers from './reducers/rootreducer';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { userSignin: { userInfo } };

export const store = createStore(
  rootreducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// let store;

// const userInfo = Cookie.getJSON('userInfo') || null;

// function initStore(initialState) {
//   return createStore(
//     rootreducers,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunkMiddleware))
//   );
// }

// export const initializeStore = (preloadedState) => {
//   let _store = store ?? initStore(preloadedState);

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = initStore({
//       ...store.getState(),
//       ...preloadedState,
//     });
//     // Reset the current store
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }
