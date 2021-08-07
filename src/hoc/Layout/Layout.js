import React, { useState } from 'react';
import classes from './Layout.scss';
import MenuToggle from '../../components/navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/navigation/Drawer/Drawer';

const Layout = (props) => {
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => {
    setMenu(!menu);
  };

  const closeMenuHandler = () => {
    setMenu(false);
  };

  return (
    <div className={classes.Layout}>
      <Drawer isOpen={menu} onClose={closeMenuHandler} />
      <MenuToggle isOpen={menu} onToggle={toggleMenuHandler} />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
