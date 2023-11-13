import SideBarContext from "contexts/SidebarContext";
import React from 'react'
import Linksmapped from "../Linksmapped";

const Sidebar = () => {
    const {isToggled} = React.useContext(SideBarContext);
  return (
    <>
      <div className={`${isToggled ? 'right-0 ' : '-right-full'} w-5/6 sm:w-4/6 md:w-1/3 lg:w-1/5 fixed top-0 h-full transition-all duration-300 border-l bg-primaryBg border-primaryBgBorder pt-[100px] text-links font-bold flex flex-col items-center gap-y-6 text-newWhite `}>
        <Linksmapped/>
      </div>
    </>
  );
};

export default Sidebar;
