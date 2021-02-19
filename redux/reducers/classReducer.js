import { CLASS_CONSTANTS } from "../actions/types";

const initialState = {
  userCurrentClassId: 0,
  userFirstCLass: true,
  isWrongClass: false,
  previousClass: 0
};

const classReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case CLASS_CONSTANTS.QUIZ_QUESTIONS:
      return state;
  
    case CLASS_CONSTANTS.USER_CURRENT_CLASS: 
      return { ...state, 
        userCurrentClassId: action.payload.newClassId,  
        userFirstCLass: action.payload.firstClass,
        isWrongClass: action.payload.isWrongClass
      };
  
    case CLASS_CONSTANTS.ISWRONG_CLASS: 
      return { ...state, 
        isWrongClass: false
      };
  
    case CLASS_CONSTANTS.SET_PREVIOUS_CLASS: 
      return { ...state, 
        previousClass: action.payload.previousClass
      };

    default:
      return state;
  }
}

export default classReducer;
