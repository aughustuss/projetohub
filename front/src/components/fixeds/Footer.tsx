import Link from "components/Link";

const Footer = () => {
  return (
    <>
      <footer className="w-full min-h-[130px] bg-black shadow-sm text-newWhite text-body flex py-10">
        <nav className="w-[80%] flex flex-row justify-between mx-auto items-start md:items-center">
          <div className=" text-bodyColor font-bold flex flex-col  gap-2 items-start justify-center">
            <p className="text-xs italic">Links</p>
            <Link bg={false} onlyBorder={false} to="/">Início</Link>
            <Link bg={false} onlyBorder={false} to="">Perfil</Link>
            <Link bg={false} onlyBorder={false} to="">Cinéfilos</Link>
            {/* <Link className="hover:text-lime-500" to="/">
              Inicio
            </Link>
            <Link className="hover:text-lime-500" to="/perfil">
              Perfil
            </Link>
            <Link className="hover:text-lime-500" to="/movie">
              Filmes
            </Link>
            <Link className="hover:text-lime-500" to="/cinefilos">
              Cinefilos
            </Link> */}
          </div>
          <address className="text-center text-xs text-bodyColor font-bold">
            HubFilmes &copy; Todos os Direitos Reservados a Augusto e Micael
          </address>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
