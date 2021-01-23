import authReducer from './authReducer';
import classReducer from './classReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authPage: authReducer,
  classReducer
});

export default rootReducer;