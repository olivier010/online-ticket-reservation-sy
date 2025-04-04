import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import GuestNavbar from '../navbar/GuestNav';
import UserNavbar from '../navbar/UserNav';
import AdminNavbar from '../navbar/AdminNav';

const NavbarSelector = () => {
  const { isGuest, isUser, isAdmin } = useContext(UserContext);

  if (isAdmin) return <AdminNavbar />;
  if (isUser) return <UserNavbar />;
  return <GuestNavbar />;
};

export default NavbarSelector;