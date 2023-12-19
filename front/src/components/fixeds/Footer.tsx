import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full min-h-[130px] bg-black shadow-sm text-newWhite text-body flex flex-col items-center py-10">
      <nav className=" flex flex-row justify-between items-center md:items-center">
        <div className="text-bodyColor font-bold flex flex-row gap-2 items-center justify-center">
          <Link className="hover:text-primaryNeon" to="/">
            Início
          </Link>
          <Link className="hover:text-primaryNeon" to="/profile">
            Perfil
          </Link>
          <Link className="hover:text-primaryNeon" to="/movie">
            Filmes
          </Link>
          <Link className="hover:text-primaryNeon" to="/cinefilos">
            Cinefilos
          </Link>
        </div>
      </nav>
      <address className="mt-[15px] text-center text-xs text-bodyColor font-bold mt-2">
        HubFilmes &copy; Todos os Direitos Reservados a Augusto e Micael
      </address>
    </footer>
  );
};

export default Footer;
