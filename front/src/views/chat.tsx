// import Card from "components/Card";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Input from "components/Input";
import Message from "components/Message";
import LoginContext from "contexts/LoginContext";
import { UserShortProfileModel } from "models/entities/User";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { addMessageToChatService, getChatMessagesService, getChatRoomsService, joinRoomService } from "services/Services";
import Loading from "./Loading";

export interface JoinRoomModel {
  connectionId: string;
  chatName: string;
}

export interface MessageCreateModel {
  chatId: number;
  content: string;
}

export interface ChatModel {
  id:number;
  chatName: string;
  users: Array<UserShortProfileModel>
}

export interface MessageModel {
  user: UserShortProfileModel
  content:string;
  sendDate: Date;
}

const Chat = () => {

  const { token } = React.useContext(LoginContext);
  // const [searchChatParam, setSearchChatParam] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [chats, setChats] = React.useState<ChatModel[]>([]);
  const [chatMessages, setChatMessages] = React.useState<MessageModel[]>([]);
  const [chatId, setChatId] = React.useState<number>();
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {control, handleSubmit, setValue} = useForm<MessageCreateModel>({
    defaultValues: {
      chatId: 0,
      content: ""
    }
  });

  // const initChat = () => {
  //   setIsLoading(true);
  //   try {
  //     const conn = new HubConnectionBuilder()
  //       .withUrl("http://localhost:5024/Chat")
  //       .build();
  
  //       conn.on("ReceiveMessage", (data) => {
  //         console.log(data);
  //       });
        
  //       conn.start()
  //         .then((response) => {
  //           console.log(response);
  //           conn.invoke("GetConnectionId")
  //             .then((response) => {
  //               setConnectionId(response);
  //               setIsLoading(false);
  //             });
  //         }).catch((err) => {
  //           console.log(err);
  //           setIsLoading(false);
  //         });

  //       setConnection(conn);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  // const joinRoom = (chatName:string) => {
  //   try{
  //     const data: JoinRoomModel = {
  //       chatName: chatName,
  //       connectionId: connectionId,
  //     }
  //     const response = joinRoomService(data)
  //     console.log(response);
  //   } catch (error){
  //     console.log(error);
  //   }
  // }

  const getUserChats = async () => {
    try {
      setIsLoading(true);
      const response = await
       getChatRoomsService(token);
      if (response.status === 200) {
        setChats(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getUserChats();
    getChatMessages();
  }, [])

  
  const getChatMessages = async () => {
    setIsLoading(true);
    if(chatId){
      try{
        const response = await getChatMessagesService(token, chatId);
        if(response.status === 200){
          setChatMessages(response.data.messages);
          setIsLoading(false);
        }
      } catch (error){
        console.log(error);
        setIsLoading(false);
      }
    }
  }
  
  const getChatMessagesAndSetId = (chatId: number) => {
    getChatMessages();
    setChatId(chatId);
  }
  
  const onSubmit: SubmitHandler<MessageCreateModel> = async (data) => {
    if(chatId)
      data.chatId = chatId;
    try{
      const response = await addMessageToChatService(data, token);
      if(response.status === 200)
        setValue("content", " ");
    } catch (error){
      console.log(error);
    }
  }
  
  
  return (
    <>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className={"h-screen flex flex-col items-center justify-center md:flex-row w-full px-4 md:w-[85%] md:px-0 mx-auto pt-[120px] mb-[60px] text-primaryBlack"}>
          <TabList className={"w-1/4 flex h-full py-2 px-1 border-r border-border flex-col gap-y-2 "}>
            {chats.map((chat, index) => (
              <Tab key={index} onLoad={() => getChatMessagesAndSetId(chat.id)} onClick={() => {
                  getChatMessagesAndSetId(chat.id)
                }} className={"rounded-xl shadow h-fit w-full p-4 flex flex-row items-center gap-x-2 hover:cursor-pointer hover:shadow-md"}>
                <img src={chat?.users[1]?.profileImageSource} className="rounded-full h-[30px] w-[30px]" />
                <p className="capitalize">{chat?.users[1]?.nickName}</p>
              </Tab>
            ))}
          </TabList>
          {chats.map((chat, index) => (
            <TabPanel key={index} className={` ${tabIndex == index ? "block" : "hidden"} md:w-3/4 p-4 flex flex-col h-full justify-center items-center gap-6 `}>
              {chatMessages.length != 0 ? (
                <div className="h-[500px] flex flex-col w-full gap-y-6 overflow-auto px-2">
                  {chatMessages.map((message, index) => (
                    <Message
                      key={index}
                      message={message}
                      chat={chat}
                      />
                  ))}
                </div>
              ) : (
                  <div className="h-[500px] flex flex-col w-full gap-y-6 overflow-auto">
                    Ainda não foram enviadas mensagens no chat.
                  </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-row items-center gap-x-2 h-[40px]">
                <Controller
                  name="content"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({field:{name, value, onChange}}) => (
                    <Input
                      hasText={message.length > 0}
                      onChange={onChange}
                      value={value}
                      onClick={() => setMessage("")}
                      placeholder="Digite sua mensagem..."
                      withIcon
                      icon={<IoMdClose />}
                      id={name}
                    />
                  )}
                />
                <button
                  className="cursor-pointer h-full justify-center flex flex-col text-xl active:scale-90"
                  type="submit"
                >
                  <IoSend />
                </button>
              </form>
            </TabPanel>
          ))}
        </Tabs>
    </>
  );
};

export default Chat;
