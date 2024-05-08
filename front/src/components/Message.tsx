import { ChatModel, MessageModel } from "views/Chat";

interface MessageProps {
  message: MessageModel
  chat: ChatModel
}
const Message = ({ message, chat }: MessageProps) => {
  return (
    <>
      <div className={` ${message.user.id === chat.users[0].id ? "bg-newWhite text-black self-end" : "bg-tertiary  self-start"} min-w-[150px] md:max-w-[60%] h-auto flex flex-col flex-wrap justify-start gap-y-2 p-4 rounded-xl text-sm`}>
        <p className="text-xs italic font-bold">{message.user.id === chat.users[0].id ? "Eu" : `${chat.users[1].nickName}`  }</p>
        <p className="flex flex-wrap w-full">{message.content}</p>
        <p className="text-xs italic">{new Date(message.sendDate).toLocaleDateString()}</p>
    </div>
    </>
  );
};

export default Message;
