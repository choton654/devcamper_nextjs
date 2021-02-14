import Axios from 'axios';
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

// get all Courses
export const getCourses = () => async (dispatch) => {
  dispatch({ type: GET_COURSE_REQUEST });

  try {
    const { data } = await Axios.get('http://localhost:3000/api/v1/courses');

    dispatch({
      type: GET_COURSE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_COURSE_ERROR,
      payload: err,
    });
  }
};

// get one Course
export const getOneCourse = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_COURSE_REQUEST });
  try {
    const { data } = await Axios.get(
      `http://localhost:3000/api/v1/courses/${id}`
    );

    dispatch({
      type: GET_SINGLE_COURSE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_COURSE_ERROR,
      payload: err,
    });
  }
};

// add one Course
export const createCourse = (course, token, id) => async (dispatch) => {
  dispatch({ type: CREATE_COURSE_REQUEST });
  try {
    const { data } = await Axios.post(
      `http://localhost:3000/api/v1/bootcamps/${id}/courses`,
      course,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_COURSE_ERROR,
      payload: err,
    });
  }
};

// update one Course
export const updateCourse = (course, token, courseId) => async (dispatch) => {
  dispatch({ type: UPDATE_COURSE_REQUEST });
  try {
    const { data } = await Axios.put(
      `http://localhost:3000/api/v1/courses/${courseId}`,
      course,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_COURSE_ERROR,
      payload: err,
    });
  }
};

// delete one Course
export const deleteCourse = (token, courseId) => async (dispatch) => {
  dispatch({ type: DELETE_COURSE_REQUEST });
  try {
    const { data } = await Axios.delete(
      `http://localhost:3000/api/v1/courses/${courseId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: courseId,
    });
  } catch (err) {
    dispatch({
      type: DELETE_COURSE_ERROR,
      payload: err,
    });
  }
};
