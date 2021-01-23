import { USER_CONSTANTS } from "../actions/types";
  
import Cookies from 'js-cookie';

const initialState = {
  authPage: 'login',
  user: {}
}

const authReducer = (state = {...initialState}, action) => {

  switch (action.type) {
    case USER_CONSTANTS.AUTH_LOGIN:
      return {...state, authPage: 'login'};

    case USER_CONSTANTS.AUTH_REGISTER:
      return {...state, authPage: 'signup'};
  
    case USER_CONSTANTS.SET_USER_DETAILS: 
      return {...state, user: action.payload};

    case USER_CONSTANTS.COMMIT_USER_LOCAL: 
      Cookies.set('user', state.user, { expires: 1 });
      return state;

    case USER_CONSTANTS.USER_LOGOUT: 
      typeof window !== "undefined" ? Cookies.remove('user') : '';
      return {...state, ...initialState};

    default:
      return state;
  }
}

export default authReducer;