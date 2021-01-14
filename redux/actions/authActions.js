import { AUTH_LOGIN, AUTH_REGISTER, 
  SET_TOKEN, COMMIT_LOCAL } from "./types";

export const authLogin = () => ({
  type: AUTH_LOGIN
});

export const authRegister = () => ({
  type: AUTH_REGISTER
});

export const setToken = token => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
}

export const commitToLocalStorage = () => ({
  type: COMMIT_LOCAL
});
