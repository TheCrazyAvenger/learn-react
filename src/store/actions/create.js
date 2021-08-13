import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';
import axios from 'axios';

export const createQuizAction = (item) => {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
};

export const resetQuizCreation = () => {
  return {
    type: RESET_QUIZ_CREATION,
  };
};

export const finishCreateQuiz = () => {
  return async (dispatch, getState) => {
    await axios.post(
      'https://learn-react-f467d-default-rtdb.firebaseio.com/quizes.json',
      getState().create.quiz
    );

    dispatch(resetQuizCreation());
  };
};
