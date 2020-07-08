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

// get all Bootcamps
export const getBootcamps = () => async (dispatch) => {
  dispatch({ type: GET_BOOTCAMP_REQUEST });

  try {
    const res = await fetch('http://localhost:3000/api/v1/bootcamps');
    const data = await res.json();
    console.log(data.data);

    dispatch({
      type: GET_BOOTCAMP,
      payload: data.data,
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
    const res = await fetch(`http://localhost:3000/api/v1/bootcamps/${id}`);
    const data = await res.json();
    console.log(data);

    dispatch({
      type: GET_SINGLE_BOOTCAMP,
      payload: data.data,
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
    const res = await fetch(
      `http://localhost:3000/api/v1/bootcamps/${id}/courses`
    );
    const data = await res.json();
    console.log(data);

    dispatch({
      type: GET_SINGLE_BOOTCAMP_COURSE,
      payload: data.data,
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
    const res = await fetch(
      `http://localhost:3000/api/v1/bootcamps/${id}/reviews`
    );
    const data = await res.json();
    console.log(data);

    dispatch({
      type: GET_SINGLE_BOOTCAMP_REVIEW,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_BOOTCAMP_REVIEW_ERROR,
      payload: err,
    });
  }
};
