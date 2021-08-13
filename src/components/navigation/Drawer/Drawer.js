import React from 'react';
import classes from './Drawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const Drawer = (props) => {
  const clickHandler = () => {
    props.onClose();
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

  if (!props.isOpen) {
    cls.push(classes.close);
  }

  const links = [
    {
      to: '/',
      label: 'Список',
      exact: true,
    },
  ];

  if (props.isAuth) {
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
    <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>{renderLinks(links)}</ul>
      </nav>
      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
    </React.Fragment>
  );
};

export default Drawer;
