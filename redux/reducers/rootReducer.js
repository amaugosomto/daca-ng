import authReducer from './authReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authPage: authReducer
});

export default rootReducer;