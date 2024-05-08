import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
const Card = () => {
  return (
    <>
      <div className="w-full h-[70px] border-b border-border flex flex-row items-center hover:bg-border transition duration-300 cursor-pointer  justify-between text-sm gap-x-2 px-4 py-2 text-bodyColor group">
        <div className="rounded-full">
            <FaUserCircle className="text-5xl"/>
        </div>
        <div className="flex flex-col w-full h-full justify-between">
            <p>Nome pessoa</p>
            <p className="line-clamp-1 text-xs">Mensagem pessoa</p>
        </div>
        <div className="text-xs flex flex-row items-center gap-x-2">
            <p className="bg-red-600 rounded-full h-[15px] w-[15px] font-bold text-white text-center" >1</p>
            <div className="group-hover:flex group-hover:items-center group-hover:justify-center group-hover:opacity-100 hidden opacity-0 transition duration-300 h-[20px] w-[20px] rounded-full hover:bg-newBlack text-center">
                <IoIosArrowDown className="text-white text-lg"/>
            </div>
        </div>
        
      </div>
    </>
  );
};

export default Card;
