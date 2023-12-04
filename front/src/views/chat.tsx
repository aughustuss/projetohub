import Card from "components/Card";
import Input from "components/Input";
import React from "react";
import { IoSend } from "react-icons/io5";
const Chat = () => {
  const [searchChatParam, setSearchChatParam] = React.useState<string>("");
  return (
    <>
      <main className="h-screen overflow-auto flex flex-col md:flex-row w-full px-4 md:w-[90%] md:px-0 mx-auto pt-[60px] mb-[60px]">
        <section className="w-full md:w-1/4 border-r border-primaryBgBorder flex flex-col gap-y-6 p-4 ">
          <Input
            placeholder="Busque por um chat"
            onClick={() => setSearchChatParam("")}
            hasText={searchChatParam.length > 0}
            value={searchChatParam}
            onChange={(e) => setSearchChatParam(e.target.value)}
          />
          <div className="flex flex-col">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section>
        <section className="w-full md:w-3/4 p-4 flex flex-col justify-between">
            <div>

            </div>
            <div className="w-full px-4 flex flex-row items-center gap-x-2 h-[40px]">
                <input className="w-full text-sm bg-transparent border border-primaryBgBorder rounded-lg pl-4 pr-8 h-full" placeholder="Digite sua mensagem..." />
                <button className="cursor-pointer h-full justify-center flex flex-col text-xl active:scale-90">
                    <IoSend/>
                </button>
            </div>
        </section>
      </main>
    </>
  );
};

export default Chat;
