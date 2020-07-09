import { combineReducers } from 'redux';
import { authReducers } from './authReducers';
import { bootcampReducer } from './bootcampReducers';
import { courseReducer } from './courseReducers';
import { reviewReducer } from './reviewReducers';

// COMBINED REDUCERS
const rootreducers = {
  Bootcamps: bootcampReducer,
  Courses: courseReducer,
  Auth: authReducers,
  Reviews: reviewReducer,
};

export default combineReducers(rootreducers);
