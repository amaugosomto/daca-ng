import { ADMIN_CONSTANTS } from "./types";

export const setClasses = classes => dispatch => {
  dispatch({
    type: ADMIN_CONSTANTS.SET_CLASSES,
    payload: classes
  });
}

export const setDetailedClasses = classes => dispatch => {
  dispatch({
    type: ADMIN_CONSTANTS.SET_DETAILED_CLASSES,
    payload: classes
  });
}