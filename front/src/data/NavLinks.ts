
import { NavbarLink } from 'models/entities/NavLink';
import {BiSolidHeart, BiSolidChat} from 'react-icons/bi'
export const NavLinks: Array<NavbarLink> = [
    {
        linkText: "Início",
        linkTo: "/",   
    },
    {
        linkText: "Perfil",
        linkTo: "/profile",
    },
    {
        linkText: "Filmes",
        linkTo: "#",
    },
    {
        linkText: "Cinéfilos",
        linkTo: "#",
    },
    {
        linkTo: "/profile",
        linkText: "Favoritos",
        linkIcon: BiSolidHeart,
    },
    {
        linkTo: "/chat",
        linkText: "Conversas",
        linkIcon: BiSolidChat,
    }
];