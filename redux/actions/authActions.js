import axios from 'axios';
import Cookie from 'js-cookie';
import {
  LOAD_USER_ERROR,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../types/authtypes';

// load user via token
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });

  try {
    const token = Cookie.getJSON('userInfo') || null;

    const { data } = await axios.get(
      'http://localhost:3000/api/v1/auth/me',

      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(data);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_ERROR,
      payload: err,
    });
  }
};

// login user
export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(
      'http://localhost:3000/api/v1/auth/login',
      user,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    Cookie.set('userInfo', JSON.stringify(data.token));

    loadUser();
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
      payload: err,
    });
  }
};
