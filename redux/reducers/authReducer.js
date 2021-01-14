import { AUTH_LOGIN, AUTH_REGISTER, 
  SET_TOKEN, COMMIT_LOCAL } from "../actions/types";

const initialState = {
  authPage: 'login',
  token: ""
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {...state, authPage: 'login'};

    case AUTH_REGISTER:
      return {...state, authPage: 'signup'};
  
    case SET_TOKEN: 
      return {...state, token: action.payload};

    case COMMIT_LOCAL: 
      localStorage.setItem('state', JSON.stringify(state));
      return;

    default:
      return {...initialState};
  }
}

export default authReducer;