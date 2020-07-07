import {
  GET_BOOTCAMP,
  GET_BOOTCAMP_ERROR,
  GET_BOOTCAMP_REQUEST,
  GET_SINGLE_BOOTCAMP,
  GET_SINGLE_BOOTCAMP_COURSE,
  GET_SINGLE_BOOTCAMP_COURSE_ERROR,
  GET_SINGLE_BOOTCAMP_COURSE_REQUEST,
  GET_SINGLE_BOOTCAMP_ERROR,
  GET_SINGLE_BOOTCAMP_REQUEST,
  GET_SINGLE_BOOTCAMP_REVIEW,
  GET_SINGLE_BOOTCAMP_REVIEW_ERROR,
  GET_SINGLE_BOOTCAMP_REVIEW_REQUEST,
} from '../types/bootcamptypes';

const initialState = {
  bootcamps: [],
  bootcamp: {},
  courses: [],
  reviews: [],
  loading: false,
  error: null,
};

export const bootcampReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOTCAMP_REQUEST:
    case GET_SINGLE_BOOTCAMP_REQUEST:
    case GET_SINGLE_BOOTCAMP_COURSE_REQUEST:
    case GET_SINGLE_BOOTCAMP_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BOOTCAMP:
      return {
        ...state,
        bootcamps: action.payload,
        loading: false,
      };
    case GET_BOOTCAMP_ERROR:
    case GET_SINGLE_BOOTCAMP_ERROR:
    case GET_SINGLE_BOOTCAMP_COURSE_ERROR:
    case GET_SINGLE_BOOTCAMP_REVIEW_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_SINGLE_BOOTCAMP:
      return {
        ...state,
        bootcamp: action.payload,
        loading: false,
      };
    case GET_SINGLE_BOOTCAMP_COURSE:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case GET_SINGLE_BOOTCAMP_REVIEW:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
