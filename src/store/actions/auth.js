import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export const auth = (email, password, isLogin) => {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCt9VBL2J0jWbzCnm8TjN3zGOPaXQ9o8cY';
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCt9VBL2J0jWbzCnm8TjN3zGOPaXQ9o8cY';
    }
    const response = await axios.post(url, authData);
    console.log(response.data);

    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('userId', response.data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(response.data.idToken));

    dispatch(autoLogOut(response.data.expiresIn));
  };
};

export const autoLogOut = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
};

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token,
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));

        dispatch(autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};
