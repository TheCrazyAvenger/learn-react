import React, { useState } from 'react';
import classes from './QuizCreator.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import { connect } from 'react-redux';
import { createQuizAction, finishCreateQuiz } from '../../store/actions/create';
import '@babel/polyfill';

const createOptionControl = (number) => {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true }
  );
};

const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

const QuizCreator = (props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [formControls, setFormControls] = useState(createFormControls());

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const addQuestionHandler = (e) => {
    e.preventDefault();

    const { question, option1, option2, option3, option4 } = formControls;

    const questionItem = {
      question: question.value,
      id: props.quiz.length + 1,
      rightAnswerId: Number(rightAnswerId),
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };

    props.createQuizAction(questionItem);

    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControls());
  };

  const createQuizHandler = (e) => {
    e.preventDefault();

    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControls());

    props.finishCreateQuiz();
  };

  const changeHandler = (value, controlName) => {
    const formControl = { ...formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControl[controlName] = control;

    setFormControls(formControl);
    setIsFormValid(validateForm(formControl));
  };

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, i) => {
      const control = formControls[controlName];

      return (
        <Auxiliary key={controlName + i}>
          <Input
            key={i}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(e) => {
              changeHandler(e.target.value, controlName);
            }}
          />
          {i === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  };

  const selectChangeHandler = (e) => {
    setRightAnswerId(e.target.value);
  };

  const select = (
    <Select
      label="Выберите правильный ответ"
      value={rightAnswerId}
      onChange={selectChangeHandler}
      options={[
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
      ]}
    />
  );

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>
          {renderControls()}

          {select}

          <Button type="primary" disabled={!isFormValid} onClick={addQuestionHandler}>
            Добавить вопрос
          </Button>
          <Button type="success" disabled={props.quiz.length === 0} onClick={createQuizHandler}>
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quiz: state.create.quiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createQuizAction: (item) => dispatch(createQuizAction(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
