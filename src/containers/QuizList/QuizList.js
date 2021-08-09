import React from 'react';
import classes from './QuizList.scss';
import { NavLink } from 'react-router-dom';

const QuizList = () => {
  const renderQuizes = () => {
    return [1, 2, 3].map((quiz, i) => {
      return (
        <li key={i}>
          <NavLink to={'/quiz/' + quiz}>Тест {quiz}</NavLink>
        </li>
      );
    });
  };

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>

        <ul>{renderQuizes()}</ul>
      </div>
    </div>
  );
};

export default QuizList;
