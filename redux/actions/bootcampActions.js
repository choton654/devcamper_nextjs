import axios from "axios";
import { BASE_URL } from "../../utils/baseurl";
import {
  BOOTCAMP_PHOTO_UPLOAD_ERROR,
  BOOTCAMP_PHOTO_UPLOAD_REQUEST,
  BOOTCAMP_PHOTO_UPLOAD_SUCCESS,
  CREATE_BOOTCAMP_ERROR,
  CREATE_BOOTCAMP_REQUEST,
  CREATE_BOOTCAMP_SUCCESS,
  DELETE_BOOTCAMP_ERROR,
  DELETE_BOOTCAMP_REQUEST,
  DELETE_BOOTCAMP_SUCCESS,
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
  UPDATE_BOOTCAMP_ERROR,
  UPDATE_BOOTCAMP_REQUEST,
  UPDATE_BOOTCAMP_SUCCESS,
} from "../types/bootcamptypes";

// get all Bootcamps
export const getBootcamps = () => async (dispatch) => {
  dispatch({ type: GET_BOOTCAMP_REQUEST });

  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/bootcamps`);

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
    const { data } = await axios.get(`${BASE_URL}/api/v1/bootcamps/${id}`);

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
      `${BASE_URL}/api/v1/bootcamps/${id}/courses`
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
      `${BASE_URL}/api/v1/bootcamps/${id}/reviews`
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

// create a Bootcamp
export const createBootcamp = (bootcamp, token) => async (dispatch) => {
  dispatch({ type: CREATE_BOOTCAMP_REQUEST });

  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/bootcamps`,
      bootcamp,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: CREATE_BOOTCAMP_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CREATE_BOOTCAMP_ERROR,
      payload: err,
    });
  }
};

// update a  Bootcamp
export const updateBootcamp = (id, bootcamp, token) => async (dispatch) => {
  dispatch({ type: UPDATE_BOOTCAMP_REQUEST });

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/v1/bootcamps/${id}`,
      bootcamp,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: UPDATE_BOOTCAMP_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_BOOTCAMP_ERROR,
      payload: err,
    });
  }
};

// delete a Bootcamp
export const deleteBootcamp = (id, token) => async (dispatch) => {
  dispatch({ type: DELETE_BOOTCAMP_REQUEST });

  try {
    const { data } = await axios.delete(`${BASE_URL}/api/v1/bootcamps/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: DELETE_BOOTCAMP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_BOOTCAMP_ERROR,
      payload: err,
    });
  }
};

// Bootcamp photo upload
export const bootcampPhotoUpload = (id, token, photo) => async (dispatch) => {
  dispatch({ type: BOOTCAMP_PHOTO_UPLOAD_REQUEST });

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/v1/bootcamps/${id}/photo`,
      photo,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: BOOTCAMP_PHOTO_UPLOAD_SUCCESS,
      payload: data,
    });
    
  } catch (err) {
    console.log(err);
    dispatch({
      type: BOOTCAMP_PHOTO_UPLOAD_ERROR,
      payload: err,
    });
  }
};
