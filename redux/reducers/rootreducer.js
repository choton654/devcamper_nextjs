import { combineReducers } from 'redux';
import { authReducers } from './authReducers';
import { bootcampReducer } from './bootcampReducers';
import { courseReducer } from './courseReducers';
import { reviewReducer } from './reviewReducers';
import { userReducer } from './userReducers';

// COMBINED REDUCERS
const rootreducers = {
  Bootcamps: bootcampReducer,
  Courses: courseReducer,
  Auth: authReducers,
  Reviews: reviewReducer,
  Users: userReducer,
};

export default combineReducers(rootreducers);
