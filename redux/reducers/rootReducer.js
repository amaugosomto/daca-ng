import authReducer from './authReducer';
import classReducer from './classReducer';
import adminReducer from './adminReducer';
import sermonReducer from './sermonReducer';
import eventReducer from './eventReducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authPage: authReducer,
  classReducer,
  adminReducer,
  sermonReducer,
  eventReducer
});

export default rootReducer;