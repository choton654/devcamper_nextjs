import { combineReducers } from 'redux';
import { authReducers } from './authReducers';
import { bootcampReducer } from './bootcampReducers';
import { courseReducer } from './courseReducers';

// COMBINED REDUCERS
const rootreducers = {
  Bootcamps: bootcampReducer,
  Courses: courseReducer,
  Auth: authReducers,
};

export default combineReducers(rootreducers);
