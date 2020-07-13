import axios from 'axios';
import {
  CREATE_BOOTCAMP_ERROR,
  CREATE_BOOTCAMP_REQUEST,
  CREATE_BOOTCAMP_SUCCESS,
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

// get all Bootcamps
export const getBootcamps = () => async (dispatch) => {
  dispatch({ type: GET_BOOTCAMP_REQUEST });

  try {
    const { data } = await axios.get('http://localhost:3000/api/v1/bootcamps');

    dispatch({
      type: GET_BOOTCAMP,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_BOOTCAMP_ERROR,
      payload: err,
    });
  }
};

// get one Bootcamp
export const getOneBootcamp = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_BOOTCAMP_REQUEST });

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/bootcamps/${id}`
    );

    dispatch({
      type: GET_SINGLE_BOOTCAMP,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_BOOTCAMP_ERROR,
      payload: err,
    });
  }
};

// get one Bootcamp's courses
export const getCoursesByBootcamp = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_BOOTCAMP_COURSE_REQUEST });

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/bootcamps/${id}/courses`
    );

    dispatch({
      type: GET_SINGLE_BOOTCAMP_COURSE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_BOOTCAMP_COURSE_ERROR,
      payload: err,
    });
  }
};

// get one Bootcamp's reviews
export const getReviewsByBootcamp = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_BOOTCAMP_REVIEW_REQUEST });

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/bootcamps/${id}/reviews`
    );

    dispatch({
      type: GET_SINGLE_BOOTCAMP_REVIEW,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_BOOTCAMP_REVIEW_ERROR,
      payload: err,
    });
  }
};

// get one Bootcamp's reviews
export const createBootcamp = (bootcamp, token) => async (dispatch) => {
  dispatch({ type: CREATE_BOOTCAMP_REQUEST });

  try {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/bootcamps`,
      bootcamp,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: CREATE_BOOTCAMP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CREATE_BOOTCAMP_ERROR,
      payload: err,
    });
  }
};
