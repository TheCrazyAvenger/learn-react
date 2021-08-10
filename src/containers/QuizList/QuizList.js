import React, { useState, useEffect } from 'react';
import classes from './QuizList.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

const QuizList = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderQuizes = () => {
    return quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const responce = await axios.get(
          'https://learn-react-f467d-default-rtdb.firebaseio.com/quizes.json'
        );

        const newQuizes = [];
        Object.keys(responce.data).map((key, i) => {
          newQuizes.push({
            id: key,
            name: `Тест ${i + 1}`,
          });
        });
        if (loading) setQuizes(newQuizes);
      } catch (e) {
        console.log(e);
      }
    };
    getData();

    return () => setLoading(false);
  });

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>

        {loading ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};

export default QuizList;
