import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { IoEye, IoPerson } from 'react-icons/io5';

const Cadastro: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleLoginClick = () => {
    if (isValidEmail(email)) {
      console.log('Login successful!');
      
    } else {
      setIsEmailValid(false);
    }
  };

  const handleRouteLogin = () => {
    navigate('/login');
  }

  const isValidEmail = (value: string): boolean => {
    return value.includes('@');
  };

  return (
    <div className="flex items-center justify-start h-screen">
      <div className="bg-[#141A1F] w-[50%] h-[84%] mt-[116px] flex flex-col items-center">
        <h1 className="text-center text-[#14FF00] text-3xl font-bold font-title mt-[180px] mb-[30px]">Bem vindo de volta!</h1>   
        <button
          className="mt-[10px] h-[45px] w-[217px] font-bold font-title text-[#14FF00] bg-transparent border-2 rounded-2xl border-[#14FF00] hover:border-white hover:text-white"
          onClick={handleRouteLogin}
        >
          Login
        </button>              
      </div>
      <div className="bg-[#0D9E00] w-[50%] h-[84%] mt-[116px] flex flex-col items-center">
        <h1 className="text-center text-3xl font-bold font-title mt-[40px] mb-[30px]">Criar Conta.</h1>
        <div className="w-full md:w-[200px] lg:w-[200px] xl:w-[400px] mb-[20px]">
          <Input
            type="text"
            placeholder="E-Mail"
            icon={<IoPerson />}
            withIcon={true}
            hasText
            left
            height={40}
            value={email}
            onChange={handleEmailChange}
          />
          {!isEmailValid && <p className="text-black font-bold text-sm mt-1">Endereço de e-mail inválido</p>}
        </div>
        <div className="w-full md:w-[200px] lg:w-[200px] xl:w-[400px] mb-[20px]">
          <Input
            type="password"
            placeholder="Senha"
            icon={<IoEye />}
            withIcon={true}
            hasText
            left
            height={40}
          />
        </div>
        <div className="w-full md:w-[200px] lg:w-[200px] xl:w-[400px] mb-[20px]">
          <Input
            type="password"
            placeholder="Confirme a Senha"
            icon={<IoEye />}
            withIcon={true}
            hasText
            left
            height={40}
          />
        </div>
        <button
          className="mt-[10px] h-[45px] w-[217px] font-bold font-title text-black bg-transparent border-2 rounded-2xl border-black hover:border-white hover:text-white"
          onClick={handleLoginClick}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
