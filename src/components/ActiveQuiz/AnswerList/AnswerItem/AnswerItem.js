import React from 'react';

import classes from './AnswerItem.scss';

const AnswerItem = ({ answer, state, onAnswerClick }) => {
  const cls = [classes.AnswerItem];

  if (state) {
    cls.push(classes[state]);
  }
  return (
    <li className={cls.join(' ')} onClick={() => onAnswerClick(answer.id)}>
      {answer.text}
    </li>
  );
};

export default AnswerItem;
