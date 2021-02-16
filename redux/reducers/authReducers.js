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
  CLEAR_ERROR
} from "../types/authtypes";
import { UPDATE_USER_SUCCESS } from "../types/usertypes";

let user;
let token;

if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
  token = localStorage.getItem("token");
}

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  loading: false,
  error: null,
  isAuthenticated: user ? true : false,
};

export const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_ERROR:
    case LOAD_USER_ERROR:
    case REGISTER_ERROR:
    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data.data,
        token: action.payload.token,
        loading: false,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
