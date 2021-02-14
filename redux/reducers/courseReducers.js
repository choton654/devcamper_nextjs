import {
  CREATE_COURSE_ERROR,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  DELETE_COURSE_ERROR,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  GET_COURSE,
  GET_COURSE_ERROR,
  GET_COURSE_REQUEST,
  GET_SINGLE_COURSE,
  GET_SINGLE_COURSE_ERROR,
  GET_SINGLE_COURSE_REQUEST,
  UPDATE_COURSE_ERROR,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
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
    case CREATE_COURSE_REQUEST:
    case UPDATE_COURSE_REQUEST:
    case DELETE_COURSE_REQUEST:
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
    case CREATE_COURSE_ERROR:
    case UPDATE_COURSE_ERROR:
    case DELETE_COURSE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_SINGLE_COURSE:
    case CREATE_COURSE_SUCCESS:
    case UPDATE_COURSE_SUCCESS:
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        course: action.payload,
      };
    // case DELETE_COURSE_SUCCESS:
    //   return {
    //     ...state,
    //     course: null,
    //   };
    default:
      return state;
  }
};
