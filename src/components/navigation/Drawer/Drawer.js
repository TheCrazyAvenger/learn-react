import React from 'react';
import classes from './Drawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
  {
    to: '/',
    label: 'Список',
    exact: true,
  },
  {
    to: 'auth',
    label: 'Авторизация',
    exact: false,
  },
  {
    to: 'quiz-creator',
    label: 'Создать тест',
    exact: false,
  },
];

const Drawer = (props) => {
  const clickHandler = () => {
    props.onClose();
  };

  const renderLinks = () => {
    return links.map((link, i) => {
      return (
        <li key={i}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  };

  const cls = [classes.Drawer];

  if (!props.isOpen) {
    cls.push(classes.close);
  }
  return (
    <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>{renderLinks()}</ul>
      </nav>
      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
    </React.Fragment>
  );
};

export default Drawer;
