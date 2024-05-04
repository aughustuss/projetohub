import { NavbarLink } from 'models/entities/NavLink';
import { BiSolidHeart, BiSolidChat } from 'react-icons/bi';

interface NavLinkProps {
  isAboveLg: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}

const useNavLinks = ({isAboveLg, isAdmin, isLoggedIn, logout}: NavLinkProps) => {

  
  const navLinks: Array<NavbarLink> = [
    {
      linkText: 'Início',
      linkTo: '/',
      show: true,
    },
    {
      linkText: 'Cadastros',
      linkTo: "#",
      show: isAdmin && isLoggedIn
    },
    {
      linkText: 'Cadastro',
      linkTo: '/register',
      show: !isLoggedIn
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
