import React, { useState, useEffect } from 'react';
import classes from './Quiz.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

const Quiz = (props) => {
  useEffect(() => {
    props.fetchQuizById(props.match.params.id);
    return props.retryQuiz();
  }, []);

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        {props.loading || !props.quiz ? (
          <Loader />
        ) : props.isFinished ? (
          <FinishedQuiz onRetry={props.retryQuiz} results={props.results} quiz={props.quiz} />
        ) : (
          <ActiveQuiz
            question={props.quiz[props.activeQuestion].question}
            answers={props.quiz[props.activeQuestion].answers}
            onAnswerClick={props.quizAnswerClick}
            quizLength={props.quiz.length}
            answerNumber={props.activeQuestion + 1}
            state={props.answerState}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz.quiz,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    loading: state.quiz.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
