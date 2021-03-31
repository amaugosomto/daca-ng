import { EVENT_CONSTANTS } from "../actions/types";

const initialState = {
  events: [],
  detailedEvents: []
};

const adminReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case EVENT_CONSTANTS.SET_EVENTS:
      return {...state, events: action.payload}
  
    case EVENT_CONSTANTS.SET_DETAILED_EVENTS:
      return {...state, detailedEvents: action.payload}

    default:
      return state;
  }
}

export default adminReducer;
