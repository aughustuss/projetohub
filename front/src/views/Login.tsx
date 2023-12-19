// src/LoginPage.tsx
import React from 'react';
import Input from '../components/input'; 
import { IoEye, IoPerson  } from "react-icons/io5";

const LoginPage: React.FC = () => {
  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <main className='bg-green-800 w-1/2 h-2/4 md:w-1/2 lg:w-1/2 h-2/4 md:h-80 lg:h-2/4 xl:h-128 flex flex-col gap-4'>
          <h1 className='text-center text-3xl font-bold font-title mt-[60px]'>FAÇA LOGIN</h1>
          <Input
            type="text"
            placeholder="Email"
            icon={<IoPerson/>}
            withIcon={true}
            hasText
            left
            width={150} 
            height={40} 
          />
          <Input
            type="text"
            placeholder="password"
            icon={<IoEye/>}
            withIcon={true}
            hasText
            left
            width={150} 
            height={40} 
          />
        </main>
      </div>
    </>
  );
};

export default LoginPage;
