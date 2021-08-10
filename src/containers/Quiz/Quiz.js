import React, { useState, useEffect } from 'react';
import classes from './Quiz.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

const Quiz = (props) => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState({});

  const onAnswerClickHandler = (answerId) => {
    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === 'success') return;
    }

    const question = quiz[activeQuestion];
    const result = results;

    if (question.rightAnswerId === answerId) {
      if (!result[question.id]) {
        result[question.id] = 'success';
      }

      setAnswerState({ [answerId]: 'success' });
      setResults(result);

      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          setIsFinished(true);
        } else {
          setActiveQuestion((activeQuestion) => {
            setAnswerState(null);
            return activeQuestion + 1;
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      result[question.id] = 'error';
      setAnswerState({ [answerId]: 'error' });
      setResults(result);
    }
  };

  const isQuizFinished = () => {
    return activeQuestion + 1 === quiz.length;
  };

  const retryHandler = () => {
    setActiveQuestion(0);
    setAnswerState(null);
    setIsFinished(false);
    setResults({});
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const responce = await axios.get(
          `https://learn-react-f467d-default-rtdb.firebaseio.com/quizes/${props.match.params.id}.json`
        );

        setQuiz(responce.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();

    return () => setLoading(false);
  });

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        {loading ? (
          <Loader />
        ) : isFinished ? (
          <FinishedQuiz onRetry={retryHandler} results={results} quiz={quiz} />
        ) : (
          <ActiveQuiz
            question={quiz[activeQuestion].question}
            answers={quiz[activeQuestion].answers}
            onAnswerClick={onAnswerClickHandler}
            quizLength={quiz.length}
            answerNumber={activeQuestion + 1}
            state={answerState}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
