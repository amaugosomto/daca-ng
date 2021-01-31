import authReducer from './authReducer';
import classReducer from './classReducer';
import adminReducer from './adminReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authPage: authReducer,
  classReducer,
  adminReducer
});

export default rootReducer;