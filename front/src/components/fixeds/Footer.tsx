import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="w-full min-h-[100px] bg-black shadow-sm text-newWhite text-body flex flex-col justify-between py-4">
        <nav className="mt-3 text-center text-base text-bodyColor font-bold flex gap-2 items-center justify-center">
          <Link className='hover:text-lime-500' to="/">Inicio</Link>
          <Link className='hover:text-lime-500' to="/perfil">Perfil</Link>
          <Link className='hover:text-lime-500' to="/movie">Filmes</Link>
          <Link className='hover:text-lime-500' to="/cinefilos">Cinefilos</Link>
        </nav>
        <address className="text-center text-xs text-bodyColor font-bold">
          HubFilmes &copy; Todos os Direitos Reservados a Augusto e Micael
        </address>
      </footer>
    </>
  );
};

export default Footer;