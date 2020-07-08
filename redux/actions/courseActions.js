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
    const res = await fetch('http://localhost:3000/api/v1/courses');
    const data = await res.json();
    console.log(data.data);

    dispatch({
      type: GET_COURSE,
      payload: data.data,
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
    const res = await fetch(`http://localhost:3000/api/v1/courses/${id}`);
    const data = await res.json();
    console.log(data);

    dispatch({
      type: GET_SINGLE_COURSE,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_COURSE_ERROR,
      payload: err,
    });
  }
};
