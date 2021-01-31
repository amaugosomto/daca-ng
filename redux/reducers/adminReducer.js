import { ADMIN_CONSTANTS } from "../actions/types";

const initialState = {
  classes: [],
  detailedClasses: []
};

const adminReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case ADMIN_CONSTANTS.SET_CLASSES:
      return {...state, classes: action.payload}
  
    case ADMIN_CONSTANTS.SET_DETAILED_CLASSES:
      return {...state, detailedClasses: action.payload}
  
    default:
      return state;
  }
}

export default adminReducer;
