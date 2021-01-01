import { AUTH_LOGIN, AUTH_REGISTER } from "../actions/types";

const initialState = {
  authPage: 'login'
}

const authReducer = (initialState = {authPage: 'login'}, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {...initialState, authPage: 'login'};

    case AUTH_REGISTER:
      return {...initialState, authPage: 'signup'}
  
    default:
      return {...initialState};
  }
}

export default authReducer;