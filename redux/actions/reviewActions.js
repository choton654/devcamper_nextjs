import axios from 'axios';
import {
  CREATE_REVIEW_ERROR,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
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
    const { data } = await axios.get('http://localhost:3000/api/v1/reviews');

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data,
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
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/reviews/${id}`
    );

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

// create review
export const createReview = (id, review, token) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    // const token = Cookie.getJSON('userInfo');

    const { data } = await axios.post(
      `http://localhost:3000/api/v1/bootcamps/${id}/reviews`,
      review,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_REVIEW_ERROR,
      payload: err,
    });
  }
};
