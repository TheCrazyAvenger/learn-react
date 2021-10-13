import React from 'react';

import AnswerItem from './AnswerItem/AnswerItem';
import classes from './AnswersList.scss';

const AnswersList = ({ answers, state, onAnswerClick }) => {
  return (
    <ul className={classes.AnswersList}>
      {answers.map((answer, i) => (
        <AnswerItem
          key={i}
          state={state ? state[answer.id] : null}
          answer={answer}
          onAnswerClick={onAnswerClick}
        />
      ))}
    </ul>
  );
};

export default AnswersList;
