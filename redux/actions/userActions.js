import axios from 'axios';
import Cookie from 'js-cookie';
import Router from 'next/router';
import {
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_ONE_USER_ERROR,
  GET_ONE_USER_REQUEST,
  GET_ONE_USER_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../types/usertypes';
import { BASE_URL } from '../../utils/baseurl';
import { REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from '../types/authtypes';

//  get all users
const getUsers = (token) => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });

  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/users`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_ERROR,
      payload: err,
    });
  }
};

//  get single user
const getOneUser = (id, token) => async (dispatch) => {
  dispatch({ type: GET_ONE_USER_REQUEST });

  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/users/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    dispatch({
      type: GET_ONE_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ONE_USER_ERROR,
      payload: err,
    });
  }
};

//  create a user
const createUser = (user) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST });

  try {
    const token = Cookie.getJSON('userInfo');

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/users`,
      user,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_USER_ERROR,
      payload: err,
    });
  }
};

//  update a user
const updateUser = (id, user, token) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    // const token = Cookie.getJSON('userInfo');

    const { data } = await axios.put(
      `${BASE_URL}/api/v1/users/${id}`,
      user,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });

    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(data.data));
    }

    Router.push('/bootcamp');
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: err,
    });
  }
};

//  update a user
const updateUserPassword = (user, token) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/v1/auth/updatepassword`,
      user,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });


    Router.push('/bootcamp');
  } catch (err) {
    dispatch({
      type: REGISTER_ERROR,
      payload: err.response.data.err,
    });
  }
};

export { getUsers, getOneUser, createUser, updateUser, updateUserPassword };
