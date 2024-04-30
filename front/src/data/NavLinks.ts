import { NavbarLink } from 'models/entities/NavLink';
import { BiSolidHeart, BiSolidChat } from 'react-icons/bi';
import React from 'react';
import LoginContext from 'contexts/LoginContext';

const useNavLinks = (isAboveLg: boolean) => {

  const { isLoggedIn, logout,  } = React.useContext(LoginContext);

  const navLinks: Array<NavbarLink> = [
    {
      linkText: 'Início',
      linkTo: '/',
      show: true,
    },
    {
      linkText: 'Cadastros',
      linkTo: "#",
      show: isLoggedIn
    },
    {
      linkText: 'Filmes',
      linkTo: '#',
      show: true,
    },
    {
      linkText: 'Cinéfilos',
      linkTo: '/cinefilos',
      show: isLoggedIn,
    },
    {
      linkText: 'Perfil',
      linkTo: '/account',
      show: isLoggedIn,
    },
    {
      linkText: 'Logout',
      linkTo: '/login',
      show: isLoggedIn,
      action: () => logout(),
    },
    {
      linkText: 'Login',
      linkTo: '/login',
      show: !isLoggedIn,
    },
    {
      linkTo: '/account',
      linkText: 'Favoritos',
      linkIcon: isAboveLg ? BiSolidHeart : undefined,
      show: isLoggedIn,
    },
    {
      linkTo: '/chat',
      linkText: 'Conversas',
      linkIcon: isAboveLg ? BiSolidChat : undefined,
      show: isLoggedIn,
    },
  ];

  return navLinks;
};

export default useNavLinks;
