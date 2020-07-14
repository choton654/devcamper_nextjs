import {
  CREATE_BOOTCAMP_ERROR,
  CREATE_BOOTCAMP_REQUEST,
  CREATE_BOOTCAMP_SUCCESS,
  DELETE_BOOTCAMP_ERROR,
  DELETE_BOOTCAMP_REQUEST,
  DELETE_BOOTCAMP_SUCCESS,
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
  UPDATE_BOOTCAMP_ERROR,
  UPDATE_BOOTCAMP_REQUEST,
  UPDATE_BOOTCAMP_SUCCESS,
} from '../types/bootcamptypes';

const initialState = {
  bootcamps: null,
  bootcamp: null,
  userCourses: null,
  userReviews: null,
  loading: false,
  error: null,
};

export const bootcampReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOTCAMP_REQUEST:
    case GET_SINGLE_BOOTCAMP_REQUEST:
    case GET_SINGLE_BOOTCAMP_COURSE_REQUEST:
    case GET_SINGLE_BOOTCAMP_REVIEW_REQUEST:
    case CREATE_BOOTCAMP_REQUEST:
    case UPDATE_BOOTCAMP_REQUEST:
    case DELETE_BOOTCAMP_REQUEST:
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
    case CREATE_BOOTCAMP_ERROR:
    case UPDATE_BOOTCAMP_ERROR:
    case DELETE_BOOTCAMP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_SINGLE_BOOTCAMP:
    case CREATE_BOOTCAMP_SUCCESS:
    case UPDATE_BOOTCAMP_SUCCESS:
    case DELETE_BOOTCAMP_SUCCESS:
      return {
        ...state,
        bootcamp: action.payload,
        loading: false,
      };
    case GET_SINGLE_BOOTCAMP_COURSE:
      return {
        ...state,
        userCourses: action.payload,
        loading: false,
      };
    case GET_SINGLE_BOOTCAMP_REVIEW:
      return {
        ...state,
        userReviews: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
