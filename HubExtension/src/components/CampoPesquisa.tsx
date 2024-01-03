import React from 'react';
import { Link } from 'react-router-dom';

const CampoPesquisa: React.FC = () => {
  return (
    <div className="w-full h-[60px] text-[20px] bg-black flex items-center justify-center">
      <div >
        <Link className="pr-[20px]" to="/home">Home</Link>
        <Link to="/filmes">Filmes</Link>
      </div>
    </div>
  );
};

export default CampoPesquisa;
