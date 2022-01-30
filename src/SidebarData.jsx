import React from 'react';
import * as BsIcons from 'react-icons/bs';
import {BiLogIn} from 'react-icons/bi';

export const SidebarData = [
  // {
  //   title: '검사하기',
  //   path: '/ToExamine',
  //   icon: <BsIcons.BsPersonBoundingBox />,
  //   cName: 'nav-text',
  // },
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
  // {
  //   title: 'About',
  //   path: '/About',
  //   icon: <BsIcons.BsFillInfoCircleFill />,
  //   cName: 'nav-text',
  // },
  // {
  //   title: 'Contact Us',
  //   path: '/Contact',
  //   icon: <BsIcons.BsEnvelopeFill />,
  //   cName: 'nav-text',
  // },
];
