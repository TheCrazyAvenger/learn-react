import React, { useState } from 'react';
import classes from './Quiz.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

const Quiz = () => {
  const [quiz, setQuiz] = useState([
    {
      question: 'Какого цвета небо',
      rightAnswerId: 2,
      id: 1,
      answers: [
        { text: 'Черный', id: 1 },
        { text: 'Синий', id: 2 },
        { text: 'Красный', id: 3 },
        { text: 'Зеленый', id: 4 },
      ],
    },
    {
      question: 'В каком году основали Санкт-Петербург',
      rightAnswerId: 3,
      id: 2,
      answers: [
        { text: '1700', id: 1 },
        { text: '1702', id: 2 },
        { text: '1703', id: 3 },
        { text: '1803', id: 4 },
      ],
    },
  ]);
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

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>
        {isFinished ? (
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
