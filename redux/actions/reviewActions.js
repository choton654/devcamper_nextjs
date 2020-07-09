import Axios from 'axios';
import {
  GET_REVIEWS_ERROR,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_SINGLE_REVIEW_ERROR,
  GET_SINGLE_REVIEW_REQUEST,
  GET_SINGLE_REVIEW_SUCCESS,
} from '../types/reviewtypes';

// get all Reviews
export const getReviews = () => async (dispatch) => {
  dispatch({ type: GET_REVIEWS_REQUEST });

  try {
    const { data } = await Axios.get('http://localhost:3000/api/v1/reviews');

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_REVIEWS_ERROR,
      payload: err,
    });
  }
};

// get one review
export const getOneReview = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_REVIEW_REQUEST });
  try {
    const res = await axios.get(`http://localhost:3000/api/v1/reviews/${id}`);

    dispatch({
      type: GET_SINGLE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_REVIEW_ERROR,
      payload: err,
    });
  }
};
