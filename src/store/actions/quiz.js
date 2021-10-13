import axios from 'axios';
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUIESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE,
} from './actionTypes';

export const fetchQuizes = () => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const responce = await axios.get(
        'https://quiz-game-a94b1-default-rtdb.firebaseio.com/quizes.json'
      );

      const newQuizes = [];
      Object.keys(responce.data).map((key, i) => {
        newQuizes.push({
          id: key,
          name: `Тест ${i + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(newQuizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
};

export const fetchQuizById = (quizId) => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const responce = await axios.get(
        `https://quiz-game-a94b1-default-rtdb.firebaseio.com/quizes/${quizId}.json`
      );

      dispatch(fetchQuizSuccess(responce.data));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
};

export const fetchQuizesStart = () => {
  return { type: FETCH_QUIZES_START };
};

export const fetchQuizSuccess = (quiz) => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
};

export const fetchQuizesSuccess = (quizes) => {
  return { type: FETCH_QUIZES_SUCCESS, quizes };
};

export const fetchQuizesError = (error) => {
  return { type: FETCH_QUIZES_ERROR, error };
};

export const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
};

export const finishQuiz = () => {
  return {
    type: FINISH_QUIZ,
  };
};

export const quizNextQuestion = (number) => {
  return {
    type: QUIZ_NEXT_QUIESTION,
    number,
  };
};

export const retryQuiz = () => {
  return {
    type: QUIZ_RETRY,
  };
};

export const quizAnswerClick = (answerId) => {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') return;
    }

    const question = state.quiz[state.activeQuestion];
    const result = state.results;

    if (question.rightAnswerId === answerId) {
      if (!result[question.id]) {
        result[question.id] = 'success';
      }

      dispatch(quizSetState({ [answerId]: 'success' }, result));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      result[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, result));
    }
  };
};

const isQuizFinished = (state) => {
  return state.activeQuestion + 1 === state.quiz.length;
};
