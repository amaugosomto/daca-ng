import { SERMON_CONSTANTS } from "../actions/types";

const initialState = {
  sermons: [],
  detailedSermons: []
};

const adminReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case SERMON_CONSTANTS.SET_SERMONS:
      return {...state, sermons: action.payload}
  
    case SERMON_CONSTANTS.SET_DETAILED_SERMONS:
      return {...state, detailedSermons: action.payload}

    default:
      return state;
  }
}

export default adminReducer;
