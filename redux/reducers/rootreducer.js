import { combineReducers } from 'redux';
import { bootcampReducer } from './bootcampReducers';
import { courseReducer } from './courseReducers';

// COMBINED REDUCERS
const rootreducers = {
  Bootcamps: bootcampReducer,
  Courses: courseReducer,
};

export default combineReducers(rootreducers);
