import React from 'react';
import Input from '../components/Input'; 
import { IoEye, IoPerson  } from "react-icons/io5";

const LoginPage: React.FC = () => {
  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <main className='bg-green-800 w-1/2 h-2/4 md:w-1/2 lg:w-1/2 h-2/4 md:h-80 lg:h-2/4 xl:h-128 flex flex-col items-center justify-cente gap-4'>
          <h1 className='text-center text-3xl font-bold font-title mt-[60px] mb-[30px]'>FAÇA LOGIN</h1>
          <div className='w-[417px]'>
            <Input
              type="text"
              placeholder="E-Mail"
              icon={<IoPerson />}
              withIcon={true}
              hasText
              left
              height={40} 
            />
          </div>
          <div className='w-[417px]'>
            <Input
              type="password"
              placeholder="password"
              icon={<IoEye />}
              withIcon={true}
              hasText
              left
              height={40} 
            />
          </div>          
          <button className='mt-[20px] h-[45px] w-[217px] font-bold font-title text-black bg-transparent border-2 rounded-2xl border-black hover:border-white hover:text-white'>Login</button>
        </main>
      </div>
    </>
  );
};

export default LoginPage;
