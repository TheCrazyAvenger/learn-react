import React from 'react';
import { NavLink } from 'react-router-dom';

import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Drawer.scss';

const Drawer = ({ onClose, isOpen, isAuth }) => {
  const clickHandler = () => {
    onClose();
  };

  const renderLinks = (links) => {
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

  if (!isOpen) {
    cls.push(classes.close);
  }

  const links = [
    {
      to: '/',
      label: 'Список',
      exact: true,
    },
  ];

  if (isAuth) {
    links.push({
      to: 'quiz-creator',
      label: 'Создать тест',
      exact: false,
    });
    links.push({
      to: 'logout',
      label: 'Выйти',
      exact: false,
    });
  } else {
    links.push({
      to: 'auth',
      label: 'Авторизация',
      exact: false,
    });
  }

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>{renderLinks(links)}</ul>
      </nav>
      {isOpen ? <Backdrop onClick={onClose} /> : null}
    </>
  );
};

export default Drawer;
