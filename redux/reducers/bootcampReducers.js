import {
  GET_BOOTCAMP,
  GET_BOOTCAMP_ERROR,
  GET_BOOTCAMP_REQUEST,
} from '../types/bootcamptypes';

const initialState = {
  bootcamps: [],
  bootcamp: {},
  loading: false,
  error: null,
};

export const bootcampReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOTCAMP_REQUEST:
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
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
