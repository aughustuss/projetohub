import React, { useState } from 'react';
import Input from '../components/Input';
import { IoEye } from 'react-icons/io5';
import Title from 'components/Title';
import Button from 'components/Button';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

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

  const isValidEmail = (value: string): boolean => {
    return value.includes('@');
  };

  return (
    <main className="h-screen w-screen flex justify-center items-center text-primaryBlack">
      <form className="w-[80%] md:w-2/3 lg:w-1/3 xl:w-1/4 h-fit flex flex-col items-center gap-y-6">
        <Title message="Crie a sua conta" black bold center fullWidth />
        <div className="flex flex-col gap-y-3 w-full">
          <div>
            <Input
              type="text"
              label="Nome"
              placeholder="Digite seu primeiro nome..."
              hasText
              value={email}
              onChange={handleEmailChange}
              />
            </div>
            <div>
            <Input
              type="text"
              label="Sobrenome"
              placeholder="Digite seu sobrenome..."
              hasText
              value={email}
              onChange={handleEmailChange}
            />
            </div>
            <div>

            <Input
              type="email"
              label="Email"
              placeholder="Digite seu email..."
              hasText
              value={email}
              onChange={handleEmailChange}
            />
            </div>
            <div>
            <Input
                type="text"
                label="Tipo"
                placeholder="Escolha o seu tipo de usuário..."
                hasText
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>

            <Input
              type="password"
              password
              label="Senha"
              placeholder="Crie uma senha..."
              hasText
              icon={<IoEye/>}
              value={email}
              onChange={handleEmailChange}
            />
            </div>
            <div>
            <Input
              type="password"
              password
              label="Confirmação de senha"
              placeholder="Repita a sua senha..."
              hasText
              icon={<IoEye/>}
              value={email}
              onChange={handleEmailChange}
            />
            </div>
          </div>
        <div className="text-sm text-bodyColor gap-2 flex flex-row items-center">
          <span>Já possui uma conta?</span>
          <a href="/login" className="font-bold text-primaryBlack underline">Clique aqui para acessar!</a>
        </div>
        <Button
          onlyBorder={false}
          small={false}
          type='submit'
          fullWidth
        >
          Cadastrar
        </Button>
      </form>
    </main>
  );
};

export default Register;
