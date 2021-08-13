import React, { useState, useEffect } from 'react';
import classes from './QuizList.scss';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

const QuizList = (props) => {
  const renderQuizes = () => {
    return props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  useEffect(() => {
    props.fetchQuizes();
  }, []);

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>

        {props.loading ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
