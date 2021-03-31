import { SERMON_CONSTANTS } from "./types";
import api from '../../middlewares/axiosConfig';

export const setSermons = sermons => dispatch => {
  dispatch({
    type: SERMON_CONSTANTS.SET_SERMONS,
    payload: sermons
  });
}

export const setDetailedSermons = sermons => dispatch => {
  dispatch({
    type: SERMON_CONSTANTS.SET_DETAILED_SERMONS,
    payload: sermons
  });
}

export const getSermons = sermons => async (dispatch) => {
  let dataFromDb = await api.get('/sermons/getAllSermons')
    .then(res => res)
    .catch(err => {
      Swal.fire({
        title: 'error',
        text: err ? err.data.msg : 'An error occured',
        icon: 'error',
        timer: 1500
      });
    });

  if (dataFromDb) {
    let sermons = dataFromDb.data.data;

    dispatch(setDetailedSermons(sermons))
  }
}

