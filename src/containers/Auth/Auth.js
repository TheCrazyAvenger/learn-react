import React, { useState } from 'react';
import classes from './Auth.scss';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import is from 'is_js';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

const Auth = (props) => {
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

  const loginHandler = () => {
    props.auth(formControls.email.value, formControls.password.value, true);
  };

  const registrationHandler = () => {
    props.auth(formControls.email.value, formControls.password.value, false);
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

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
