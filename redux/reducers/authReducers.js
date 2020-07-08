import Cookie from 'js-cookie';
import {
  LOAD_USER_ERROR,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../types/authtypes';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  user: null,
  token: userInfo,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        // token: action.payload.token,
      };
    case LOGIN_ERROR:
    case LOAD_USER_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
