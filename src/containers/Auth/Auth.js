import React, { useState } from 'react';
import classes from './Auth.scss';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import is from 'is_js';
import axios from 'axios';

const Auth = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный Email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  });

  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (e, controlName) => {
    const formControl = { ...formControls };
    const ctrl = { ...formControls[controlName] };

    ctrl.value = e.target.value;
    ctrl.touched = true;
    ctrl.valid = validateControl(ctrl.value, ctrl.validation);

    formControl[controlName] = ctrl;

    let isFormValid = true;

    Object.keys(formControl).map((name) => {
      isFormValid = formControl[name].valid && isFormValid;
    });

    setFormControls(formControl);
    setIsFormValid(isFormValid);
  };

  const renderInputs = () =>
    Object.keys(formControls).map((controlName, i) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + i}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(e) => onChangeHandler(e, controlName)}
        />
      );
    });

  const loginHandler = async () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCt9VBL2J0jWbzCnm8TjN3zGOPaXQ9o8cY',
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const registrationHandler = async () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCt9VBL2J0jWbzCnm8TjN3zGOPaXQ9o8cY',
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.Auth}>
      <div>
        <form onSubmit={submitHandler} className={classes.AuthForm}>
          {renderInputs()}

          <Button type="success" onClick={loginHandler} disabled={!isFormValid}>
            Войти
          </Button>
          <Button type="primary" onClick={registrationHandler} disabled={!isFormValid}>
            Регистрация
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
