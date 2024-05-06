// Trailer.tsx
import React, { useState } from 'react';
import Input from "../components/Input";
import Button from "../components/Button";
import { IoPerson, IoSearch, IoPlay } from 'react-icons/io5';
import { UserShortProfileModel } from 'models/entities/User';
import LoginContext from 'contexts/LoginContext';
import { getAllUsersService, getUsersByNameService } from 'services/Services';

interface UserProps {
  user: UserShortProfileModel
}

const Cinephiles: React.FC<UserProps> = ({user}: UserProps) => {
  return (
    <div className="mb-4 mt-4 rounded-xl shadow w-fit p-4">
      <div className="flex items-center gap-6">
        <img  alt="Profile" className="w-12 h-12 rounded-full" />
        <div className='flex flex-row items-center gap-x-2'>
          <p className="font-bold">{user.firstName} {""} {user.surName}</p>
          <p className='text-sm italic text-bodyColor'>{user.profileTitle}</p>
        </div>
        <div className='w-[150px] flex items-start'>   
          <Button
            onlyBorder={false}
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
          {`Filmes assistidos: ${user.watchedMoviesCount}`}           
        </p>
        <p className="flex items-center gap-[10px]">
          <IoPerson className="w-5 h-5 ml-2" />
          {`Outros amigos cinéfilos: ${user.friendsCount}`}           
        </p>            
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
          icon={<IoSearch />}
          withIcon={true}
          hasText={searchTerm.length > 0}
          left
          height={40}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {cinephiles.length > 0 ? cinephiles.map((profile, index) => (
        <Cinephiles key={index} user={profile}/>
      )) : (
        <p className='text-bodyColor text-sm italic'>Não há usuarios com o nome {searchTerm}...</p>
      )}
    </div>
  );
};

export default MockedProfiles;
