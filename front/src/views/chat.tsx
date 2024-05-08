// import Card from "components/Card";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Input from "components/Input";
import Message from "components/Message";
import LoginContext from "contexts/LoginContext";
import { UserShortProfileModel } from "models/entities/User";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { getChatRoomsService } from "services/Services";
import * as io from "socket.io-client";

interface ChatModel {
  id:number;
  chatName: string;
  users: Array<UserShortProfileModel>
}

const Chat = () => {

  const { token } = React.useContext(LoginContext);
  // const [searchChatParam, setSearchChatParam] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [chats, setChats] = React.useState<ChatModel[]>([]);
  const [userName, setUserName] = React.useState<string>("");
  const [connection, setConnection] = React.useState<HubConnection>();

  const joinChat = async (userName:string, chatRoom:string) => {
    try {
      const conn = new HubConnectionBuilder()
        .configureLogging(LogLevel.Information)
        .withUrl("http://localhost:5024/api/Chat/message")
        .build();
  
        conn.on("JoinChat", (userName, message) => {
          console.log(message);
        });
        
        await conn.start();
        
        await conn.invoke("JoinChat", { userName, chatRoom });
        
        setConnection(conn);
        console.log(conn);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserChats = async () => {
    try {
      const response = await getChatRoomsService(token);
      if (response.status === 200) {
        setChats(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getUserChats();
  }, [])

  return (
    <>
        <Tabs className={"h-screen flex flex-col items-center justify-center md:flex-row w-full px-4 md:w-[85%] md:px-0 mx-auto pt-[120px] mb-[60px] text-primaryBlack"}>
          <TabList className={"w-1/4 flex h-full py-2 px-1 border-r border-border"}>
            {chats.map((chat, index) => (
              <Tab key={index} className={"rounded-xl shadow h-fit w-full p-4 flex flex-row gap-x-2 hover:cursor-pointer hover:shadow-md"}>
                <img src={chat.users[1].profileImageSource} className="rounded-full h-[30px] w-[30px]" />
                <p>{chat.users[1].firstName}</p>
              </Tab>
            ))}
          </TabList>
          <TabPanel className={"md:w-3/4 p-4 flex flex-col h-full justify-center items-center gap-6"}>
          <div className="h-[500px] flex flex-col w-full gap-y-6 overflow-auto">

          </div>
          <form className="w-full flex flex-row items-center gap-x-2 h-[40px]">
            <Input
              hasText={message.length > 0}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onClick={() => setMessage("")}
              placeholder="Digite sua mensagem..."
              withIcon
              icon={<IoMdClose />}
            />
            <button
              onClick={() => joinChat("eu", "teste")}
              className="cursor-pointer h-full justify-center flex flex-col text-xl active:scale-90"
              type="button"
            >
              <IoSend />
            </button>
          </form>
          </TabPanel>
        </Tabs>
    </>
  );
};

export default Chat;
