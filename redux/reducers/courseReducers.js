import {
  GET_COURSE,
  GET_COURSE_ERROR,
  GET_COURSE_REQUEST,
  GET_SINGLE_COURSE,
  GET_SINGLE_COURSE_ERROR,
  GET_SINGLE_COURSE_REQUEST,
} from '../types/coursetypes';

const initialState = {
  courses: null,
  course: null,
  loading: false,
  error: null,
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_REQUEST:
    case GET_SINGLE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COURSE:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case GET_COURSE_ERROR:
    case GET_SINGLE_COURSE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_SINGLE_COURSE:
      return {
        ...state,
        loading: false,
        course: action.payload,
      };
    default:
      return state;
  }
};
