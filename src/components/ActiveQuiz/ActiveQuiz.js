import React from 'react';

import AnswersList from './AnswerList/AnswersList';
import classes from './ActiveQuiz.scss';

const ActiveQuiz = ({ answerNumber, question, quizLength, answers, state, onAnswerClick }) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}.</strong>&nbsp; {question}
        </span>
        <small>
          {answerNumber} из {quizLength}
        </small>
      </p>
      <AnswersList answers={answers} state={state} onAnswerClick={onAnswerClick} />
    </div>
  );
};

export default ActiveQuiz;
