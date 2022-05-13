import React from 'react';
import * as BsIcons from 'react-icons/bs';
import {BiLogIn} from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <BsIcons.BsFillHouseDoorFill />,
    cName: 'nav-text',
  },
  {
    title: 'Login',
    path: '/Login',
    icon: <BiLogIn />,
    cName: 'nav-text',
  },
];
