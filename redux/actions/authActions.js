import axios from 'axios';
import router from 'next/router';
import {
  LOAD_USER_ERROR,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../types/authtypes';

// load user via token
const loadUser = (token) => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });

  try {
    // const token = Cookie.getJSON('userInfo') || null;

    const { data } = await axios.get(
      'http://localhost:3000/api/v1/auth/me',

      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(data);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: { data, token },
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_ERROR,
      payload: err,
    });
  }
};

// login user
const loginUser = (user) => async (dispatch) => {
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

    // Cookie.set('userInfo', JSON.stringify(data.token));

    router.push('/');
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
      payload: err,
    });
  }
};

// register user
const registerUser = (user) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      'http://localhost:3000/api/v1/auth/register',
      user,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });

    // Cookie.set('userInfo', JSON.stringify(data.token));

    router.push('/');
  } catch (err) {
    dispatch({
      type: REGISTER_ERROR,
      payload: err,
    });
  }
};

// logout user
const logOut = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });

  try {
    const { data } = await axios.get(
      'http://localhost:3000/api/v1/auth/logout'
    );
    // console.log('logout data', data);

    dispatch({
      type: LOGOUT_SUCCESS,
      payload: data,
    });

    // Cookie.remove('userInfo');

    router.push('/login');
  } catch (err) {
    dispatch({
      type: LOGOUT_ERROR,
      payload: err,
    });
  }
};

export { loadUser, loginUser, registerUser, logOut };
