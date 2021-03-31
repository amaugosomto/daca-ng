import { EVENT_CONSTANTS } from "./types";
import api from '../../middlewares/axiosConfig';

export const setEvents = events => dispatch => {
  dispatch({
    type: EVENT_CONSTANTS.SET_EVENTS,
    payload: events
  });
}

export const setDetailedEvents = events => dispatch => {
  dispatch({
    type: EVENT_CONSTANTS.SET_DETAILED_EVENTS,
    payload: events
  });
}

export const getEvents = () => async (dispatch) => {
  let dataFromDb = await api.get('/events/getAllEvents')
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
    let events = dataFromDb.data.data;

    dispatch(setDetailedEvents(events))
  }
}

