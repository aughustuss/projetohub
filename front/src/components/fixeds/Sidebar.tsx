import SideBarContext from "contexts/SidebarContext";
import React from 'react'
import Linksmapped from "components/Linksmapped";

const Sidebar = () => {
    const {isToggled} = React.useContext(SideBarContext);
  return (
    <>
      <div className={`${isToggled ? 'right-0 md:right-[8%]' : '-right-full'} w-5/6 sm:w-4/6 md:w-1/3 mt-[100px] md:mt-[110px] lg:w-1/5 fixed top-0 h-auto transition-all duration-300 bg-primaryBg py-[20px] rounded-xl text-links font-bold flex flex-col items-center gap-y-6 text-newWhite z-40 overflow-auto`}>
        <Linksmapped/>
      </div>
    </>
  );
};

export default Sidebar;
