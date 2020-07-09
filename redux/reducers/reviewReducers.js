import {
  GET_REVIEWS_ERROR,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_SINGLE_REVIEW_ERROR,
  GET_SINGLE_REVIEW_REQUEST,
  GET_SINGLE_REVIEW_SUCCESS,
} from '../types/reviewtypes';

const initialState = {
  reviews: [],
  review: {},
  loading: false,
  error: null,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
    case GET_SINGLE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };
    case GET_REVIEWS_ERROR:
    case GET_SINGLE_REVIEW_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_SINGLE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        review: action.payload,
      };
    default:
      return state;
  }
};
