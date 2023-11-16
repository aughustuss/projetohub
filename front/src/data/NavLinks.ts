import { NavbarLink } from "models/entities/navLink";
import {BiSolidHeart, BiSolidChat} from 'react-icons/bi'
export const NavLinks: Array<NavbarLink> = [
    {
        linkText: "Início",
        linkTo: "",   
    },
    {
        linkText: "Perfil",
        linkTo: "",
    },
    {
        linkText: "Filmes",
        linkTo: "",
    },
    {
        linkText: "Cinéfilos",
        linkTo: "",
    },
    {
        linkTo: "",
        linkText: "Favoritos",
        linkIcon: BiSolidHeart,
    },
    {
        linkTo: "",
        linkText: "Conversas",
        linkIcon: BiSolidChat,
    }
];