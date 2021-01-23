import { USER_CONSTANTS } from "./types";
import Cookies from 'js-cookie';

export const authLogin = () => ({
  type: USER_CONSTANTS.AUTH_LOGIN
});

export const authRegister = () => ({
  type: USER_CONSTANTS.AUTH_REGISTER
});

export const setUserDetails = user => dispatch => {
  dispatch({
    type: USER_CONSTANTS.SET_USER_DETAILS,
    payload: user
  });
}

export const reintialiseState = () => (dispatch, getState) => {
  let user = Cookies.getJSON('user');

  if (typeof user != "undefined"){
    let userState = getState().authPage.user;

    if (Object.keys(userState).length < 1)
      dispatch(setUserDetails(user));
  }
}

export const isUserLoggedIn = () => (dispatch, getState) => {
  return Object.keys(getState().authPage.user).length > 0;
}

export const commitUserToLocalStorage = () => ({
  type: USER_CONSTANTS.COMMIT_USER_LOCAL
});

export const userLogout = () => ({
  type: USER_CONSTANTS.USER_LOGOUT
});
