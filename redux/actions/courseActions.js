import Axios from 'axios';
import {
  GET_COURSE,
  GET_COURSE_ERROR,
  GET_COURSE_REQUEST,
  GET_SINGLE_COURSE,
  GET_SINGLE_COURSE_ERROR,
  GET_SINGLE_COURSE_REQUEST,
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
