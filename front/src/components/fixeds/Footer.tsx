import { Link } from "react-router-dom";

const Footer = () => {
  return (
<<<<<<< HEAD
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
      <address className="text-center text-xs text-bodyColor font-bold mt-2">
        HubFilmes &copy; Todos os Direitos Reservados a Augusto e Micael
      </address>
    </footer>
=======
    <>
      <footer className="w-full min-h-[130px] bg-black shadow-sm text-newWhite text-body flex py-10">
        <nav className="w-[80%] flex flex-row justify-between mx-auto items-start md:items-center">
          <div className=" text-bodyColor font-bold flex flex-row  gap-2 items-start justify-center">
            
            <Link className="hover:text-primaryNeon" to="/">
              Inicio
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
          <address className="text-center text-xs text-bodyColor font-bold">
            HubFilmes &copy; Todos os Direitos Reservados a Augusto e Micael
          </address>
        </nav>
      </footer>
    </>
>>>>>>> f1f7b15258956f0e3d8ce2582c94d3ce24c14303
  );
};

export default Footer;
