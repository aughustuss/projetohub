import { NavbarLinks } from "models/entities/NavLink";
import {BiSolidHeart, BiSolidChat} from 'react-icons/bi'
export const NavLinks: Array<NavbarLinks> = [
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