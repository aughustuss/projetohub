import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Input from '../components/input';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleLoginClick = () => {
    if (isValidEmail(email)) {
      const autenticacaoBemSucedida = true;
  
      if (autenticacaoBemSucedida) {
        setIsAuthenticated(true);
        navigate('/home');
      } else {
        console.log('Falha na autenticação');
      }
    } else {
      setIsEmailValid(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <main className="bg-[#0D9E00] rounded-lg w-[700px] h-[400px] flex flex-col items-center justify-start gap-4 mx-auto">
        <h1 className="text-center text-3xl font-bold font-title mt-[40px] mb-[30px]">FAÇA LOGIN</h1>
        <div className="w-[400px]">
          <Input
            type="text"
            placeholder="E-Mail"
            hasText
            left
            height={40}
            value={email}
            onChange={handleEmailChange}
          />
          {!isEmailValid && <p className="text-black font-bold text-sm mt-1">Endereço de e-mail inválido</p>}
        </div>
        <div className="w-[400px]">
          <Input
            type="password"
            placeholder="Senha"
            hasText
            left
            height={40}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <p className="font-bold font-title text-white cursor-pointer mt-2">
          Não tem conta. <span className="text-black font-bold">Criar conta</span>
        </p>
        <button
          className="mt-[10px] h-[45px] w-[217px] font-bold font-title text-black bg-transparent border-2 rounded-2xl border-black hover:border-white hover:text-white"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </main>
    </div>
  );
};

export default LoginPage;
