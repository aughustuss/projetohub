// Trailer.tsx
import React, { useState } from 'react';
import Input from "../components/Input";
import Button from "../components/Button";
import sobre from "../assets/sobre.jpeg";
import augusto from "../assets/augusto.jpg";
import { IoPerson, IoSearch, IoPlay } from 'react-icons/io5';

interface UserProps {
  profilePicture: string;
  name: string;
  cinephileDescription: string;
  moviesWatched: number;
  friendsCount: number;
}

const Cinefilos: React.FC<UserProps> = ({
  profilePicture,
  name,
  cinephileDescription,
  moviesWatched,
  friendsCount,
}) => {
  return (
    <div className="mb-4 mt-4 rounded-lg">
      <div className="flex items-center gap-6">
        <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-bold text-lg">{name}</p>
          <p className="text-gray-500">{cinephileDescription}</p>
        </div>
        <div className='w-[150px] flex items-start'>   
          <Button
            green={true}
            onlyBorder
            small
            fullWidth
          >
            Seguir
          </Button>
        </div>    
      </div>

      <div className="flex gap-2 mt-2">
        <p className="flex items-center gap-[10px]">
          <IoPlay className="w-5 h-5" />
          {`Filmes assistidos: ${moviesWatched}`}           
        </p>
        <p className="flex items-center gap-[10px]">
          <IoPerson className="w-5 h-5 ml-2" />
          {`Outros amigos cinéfilos: ${friendsCount}`}           
        </p>            
      </div>
    </div>
  );
};

const mockProfiles: UserProps[] = [
    {
        profilePicture: augusto,
        name: "Augusto de Paula",
        cinephileDescription: "Um grande cinéfilo",
        moviesWatched: 50,
        friendsCount: 10,
      },
      {
        profilePicture: sobre,
        name: "Micael Oliveira",
        cinephileDescription: "Outro cinéfilo",
        moviesWatched: 80,
        friendsCount: 15,
      },
      {
        profilePicture: sobre,
        name: "Fernando",
        cinephileDescription: "Outro cinéfilo",
        moviesWatched: 80,
        friendsCount: 15,
      },
      {
        profilePicture: sobre,
        name: "Pedro",
        cinephileDescription: "Outro cinéfilo",
        moviesWatched: 80,
        friendsCount: 15,
      },
      {
        profilePicture: sobre,
        name: "Paulo",
        cinephileDescription: "Outro cinéfilo",
        moviesWatched: 80,
        friendsCount: 15,
      },
      {
        profilePicture: sobre,
        name: "Alfred",
        cinephileDescription: "Outro cinéfilo",
        moviesWatched: 80,
        friendsCount: 15,
      },
    ];

const MockedProfiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProfiles = mockProfiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col gap-y-[20px] pt-[50px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto" style={{ marginTop: '100px' }}>
      <div className='w-[300px]' style={{ marginTop: '20px' }}>
        <Input 
          type="text"
          placeholder="Busque um amigo cinefilo"
          icon={<IoSearch />}
          withIcon={true}
          hasText
          left
          height={40}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredProfiles.map((profile, index) => (
        <Cinefilos key={index} {...profile} />
      ))}
    </div>
  );
};

export default MockedProfiles;
