import { combineReducers } from 'redux';
import quizReducer from './quiz';
import createdReducer from './create';
import authReducer from './auth';

export default combineReducers({
  quiz: quizReducer,
  create: createdReducer,
  auth: authReducer,
});
