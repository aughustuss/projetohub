// src/LoginPage.tsx
import React from 'react';
import Input from '../components/Input'; 

const LoginPage: React.FC = () => {
  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <main className='bg-green-800 w-1/2 h-2/4 md:w-1/2 lg:w-1/2 md:h-80 lg:h-2/4 xl:h-128'>
          <h1 className='text-center text-3xl font-bold font-title mt-[60px]'>FAÇA LOGIN</h1>
          <Input
            type="text"
            placeholder="Email"
            
          />
        </main>
      </div>
    </>
  );
};

export default LoginPage;
