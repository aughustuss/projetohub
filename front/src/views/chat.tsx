// import Card from "components/Card";
import Input from "components/Input";
import Message from "components/Message";
import LoginContext from "contexts/LoginContext";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import * as io from "socket.io-client";

interface ChatModel {
  message: string;
  user: string;
}

const Chat = () => {
  // const [searchChatParam, setSearchChatParam] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const socketIo = io.connect("http://localhost:5000");
  const [chats, setChats] = React.useState<ChatModel[]>([]);
  const { user } = React.useContext(LoginContext);

  React.useEffect(() => {
    socketIo.on("chat", (chats) => {
      setChats(chats);
    });
  });

  const sendChat = (chat: ChatModel[]) => {
    socketIo.emit("chat", chat);
    setMessage("");
  };

  const sendMessage = (chat: ChatModel) => {
    const newChat = { ...chat, user };
    if (chat.message.length > 0) {
      setChats([...chats, newChat]);
      sendChat([...chats, newChat]);
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>, chat: ChatModel) => {
    const newChat = { ...chat, user };
    if(event.key === "Enter" && message.length > 0){
      setChats([...chats, newChat]);
      sendChat([...chats, newChat]);
    }
  }

  console.log(chats);
  return (
    <>
      <main className="h-screen overflow-auto flex flex-col justify-center md:flex-row w-full px-4 md:w-[90%] md:px-0 mx-auto pt-[120px] mb-[60px]">
        {/* <section className="w-full md:w-1/4 border-r border-primaryBgBorder flex flex-col gap-y-6 p-4 ">
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
        </section> */}
        <section className="w-full md:w-3/4 p-4 flex flex-col justify-end gap-6">
          {chats.map((chat, index) => (
            <Message
              key={index}
              user={chat.user}
              receiver={chat.user !== user}
              message={chat.message}
            />
          ))}
          <div className="w-full flex flex-row items-center gap-x-2 h-[40px]">
            <Input
              transparent
              hasText={message.length > 0}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onClick={() => setMessage("")}
              placeholder="Digite sua mensagem..."
              withIcon
              icon={<IoMdClose />}
              onKeyDown={(e) => handleEnter(e, {user, message})}
            />
            <button
              onClick={() => {
                sendMessage({ user, message });
              }}
              className="cursor-pointer h-full justify-center flex flex-col text-xl active:scale-90"
            >
              <IoSend />
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Chat;
