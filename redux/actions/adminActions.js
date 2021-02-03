import { ADMIN_CONSTANTS } from "./types";
import Cookies from 'js-cookie';

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

export const setAdminUserDetails = user => dispatch => {
  dispatch({
    type: ADMIN_CONSTANTS.SET_ADMIN_USER_DETAILS,
    payload: user
  });
}

export const reintialiseAdminState = () => (dispatch, getState) => {
  let user = Cookies.getJSON('adminuser');

  if (typeof user != "undefined"){
    let userState = getState().adminReducer.user;

    if (Object.keys(userState).length < 1)
      dispatch(setAdminUserDetails(user));
  }
}

export const isAdminUserLoggedIn = () => (dispatch, getState) => {
  return Object.keys(getState().adminReducer.user).length > 0;
}

export const commitAdminUserToLocalStorage = () => ({
  type: ADMIN_CONSTANTS.COMMIT_ADMIN_USER_LOCAL
});

export const userLogout = () => ({
  type: ADMIN_CONSTANTS.ADMIN_USER_LOGOUT
});
