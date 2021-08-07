import React from 'react';
import classes from './Drawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [1, 2, 3];

const Drawer = (props) => {
  const renderLinks = () => {
    return links.map((link, i) => {
      return (
        <li key={i}>
          <a href="">Link{link}</a>
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
