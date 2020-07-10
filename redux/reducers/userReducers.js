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

const initialState = {
  users: null,
  user: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
    case GET_ONE_USER_REQUEST:
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_USERS_ERROR:
    case GET_ONE_USER_ERROR:
    case CREATE_USER_ERROR:
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_ONE_USER_SUCCESS:
    case CREATE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
