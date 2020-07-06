import {
  GET_BOOTCAMP,
  GET_BOOTCAMP_ERROR,
  GET_BOOTCAMP_REQUEST,
} from '../types/bootcamptypes';

// get all Bootcamps
export const getBootcamps = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({ type: GET_BOOTCAMP_REQUEST });

  try {
    const res = await fetch('http://localhost:3000/api/v1/bootcamps', config);
    const data = await res.json();
    console.log(data.data);

    dispatch({
      type: GET_BOOTCAMP,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BOOTCAMP_ERROR,
      payload: err,
    });
  }
};
