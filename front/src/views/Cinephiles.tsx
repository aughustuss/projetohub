// Trailer.tsx
import React, { useState } from 'react';
import Input from "../components/Input";
import Button from "../components/Button";
import { IoPerson, IoPlay } from 'react-icons/io5';
import { UserShortProfileModel } from 'models/entities/User';
import LoginContext from 'contexts/LoginContext';
import { getAllUsersService, getUsersByNameService } from 'services/Services';
import { IoMdClose } from 'react-icons/io';
import Link from 'components/Link';

interface UserProps {
  user: UserShortProfileModel
}

const Cinephiles: React.FC<UserProps> = ({user}: UserProps) => {
  return (
    <div className="rounded-xl flex flex-row shadow w-2/4 justify-between p-4">
      <div className='flex flex-col gap-y-2'>
        <div className="flex flex-row items-center gap-6">
          <img  alt="Profile" className="w-12 h-12 rounded-full" />
          <div className='flex flex-row items-center gap-x-2'>
            <p className="font-bold">{user.firstName} {""} {user.surName}</p>
            <p className='text-sm italic text-bodyColor'>{user.profileTitle}</p>
          </div>
        </div>
        <div className="flex flex-row gap-x-2">
          <p className="flex items-center gap-[10px]">
            <IoPlay className="w-5 h-5" />
            {`Filmes assistidos: ${user.watchedMoviesCount}`}           
          </p>
          <p className="flex items-center gap-[10px]">
            <IoPerson className="w-5 h-5 ml-2" />
            {`Outros amigos cinéfilos: ${user.friendsCount}`}           
          </p>            
        </div>
      </div>
      <div className='flex flex-col gap-y-2'>
       <Button
          onlyBorder={false}
          small
          fullWidth
        >
          Seguir
        </Button>
        <Link
          to={`/profile/${user.id}`}
          onlyBorder
          bgPrimary
          fullWidth
          small
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );
};


const MockedProfiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  
  const {token} = React.useContext(LoginContext);

  const [cinephiles, setCinephiles] = React.useState<UserShortProfileModel[]>([]);
  const [defaultCinephiles, setDefaultCinephiles] = React.useState<UserShortProfileModel[]>([]);
  
  const getCinephiles = async () => {
    try{
      const response = await getAllUsersService(token);
      if(response.status === 200){
        setCinephiles(response.data);
        setDefaultCinephiles(response.data);
      }
    } catch (error){
      console.log(error);
    }
  }

  const getCinephilesByName = async (name: string) => {
    if(searchTerm.length > 0){
      try{
        const response = await getUsersByNameService(name, token);
        if(response.status === 200){
          setCinephiles(response.data);
        }
        
      } catch (error){
        console.log(error);
      }
    } else {
      setCinephiles(defaultCinephiles);
    }
  }

  React.useEffect(() => {
    getCinephiles();
  }, []);

  console.log(defaultCinephiles);

  React.useEffect(() => {
    getCinephilesByName(searchTerm);
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col gap-y-[20px] mt-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto text-primaryBlack">
      <div className='w-[300px]' style={{ marginTop: '20px' }}>
        <Input 
          type="text"
          placeholder="Busque um amigo cinefilo"
          icon={<IoMdClose />}
          hasText={searchTerm.length > 0}
          height={40}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setSearchTerm("")}
        />
      </div>
      <div className='flex flex-col w-full gap-y-2 '>
      {cinephiles.length > 0 ? cinephiles.map((profile, index) => (
        <Cinephiles key={index} user={profile}/>
      )) : (
        <p className='text-bodyColor text-sm italic'>Não há usuarios com o nome {searchTerm}...</p>
      )}
      </div>
    </div>
  );
};

export default MockedProfiles;
