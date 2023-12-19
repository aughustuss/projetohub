// src/LoginPage.tsx
import React from "react";
import Input from "components/Input";
import { IoEye, IoPerson } from "react-icons/io5";

const LoginPage: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <main className="bg-green-800 w-1/2 h-2/4 md:h-80 lg:h-2/4 flex flex-col gap-4">
          <h1 className="text-center text-3xl font-bold font-title mt-[60px]">
            FAÇA LOGIN
          </h1>
          <Input
            hasText
            type="text"
            placeholder="Pesquise por um filme..."
            left
            withIcon
            icon={<IoEye />}
          />

          <Input
            type="text"
            placeholder="password"
            icon={<IoPerson />}
            withIcon={true}
            hasText
            left
          />
        </main>
      </div>
    </>
  );
};

export default LoginPage;
