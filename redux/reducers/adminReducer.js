import { ADMIN_CONSTANTS } from "../actions/types";
import Cookies from 'js-cookie';

const initialState = {
  classes: [],
  detailedClasses: [],
  user: {}
};

const adminReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case ADMIN_CONSTANTS.SET_CLASSES:
      return {...state, classes: action.payload}
  
    case ADMIN_CONSTANTS.SET_DETAILED_CLASSES:
      return {...state, detailedClasses: action.payload}
  
    case ADMIN_CONSTANTS.SET_ADMIN_USER_DETAILS:
      return {...state, user: action.payload}
  
    case ADMIN_CONSTANTS.COMMIT_ADMIN_USER_LOCAL:
      Cookies.set('adminuser', state.user, { expires: 1 });
      return state;

    case ADMIN_CONSTANTS.ADMIN_USER_LOGOUT: 
      typeof window !== "undefined" ? Cookies.remove('adminuser') : '';
      return {...state, ...initialState};

    default:
      return state;
  }
}

export default adminReducer;
