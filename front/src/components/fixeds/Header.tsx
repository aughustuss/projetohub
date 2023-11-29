import { IoMenu } from "react-icons/io5";
import React from "react";
import SideBarContext from "contexts/sidebarContext";
import useMediaQuery from "hooks/mediaScreen";
import Linksmapped from "components/linksMapped";
import Input from "components/input";

interface HeaderProps {
  isOnTop: boolean;
}
const Header = ({ isOnTop }: HeaderProps) => {
  const [searchParam, setSearchParam] = React.useState<string>("");
  const { isToggled, handleToggle, setIsToggled } =
    React.useContext(SideBarContext);
  const isAboveLG = useMediaQuery("(min-width: 1024px)");
  if (isAboveLG) setIsToggled(false);
  return (
    <>
      <nav
        className={`${
          isOnTop ? !isToggled ? "bg-transparent" : "bg-primaryBg" : "bg-primary"
        } h-[60px] w-full fixed top-0 transition-all duration-300 text-newWhite z-30`}
      >
        <div className="flex justify-between items-center h-full flex-row w-[95%] md:w-[90%] mx-auto">
          <a
            href="/"
            className={`${
              isOnTop ? "text-primary" : "text-newWhite"
            } text-smallDevicesTitle font-title font-black md:text-subTitle lg:text-title cursor-pointer`}
          >
            HubFilmes
          </a>
          <div className="w-2/3 px-4 md:px-0 md:w-1/3 h-1/2 relative flex flex-row items-center">
            
            <Input 
              hasText={searchParam.length > 0}
              onChange={(e) => setSearchParam(e.target.value)}
              onClick={() => setSearchParam("")}
              type="text"
              placeholder="Pesquisa por um filme"
              value={searchParam}
            />
          </div>
          <div className="text-links font-bold flex flex-row items-center gap-x-8">
            {isAboveLG ? (
              <Linksmapped isAboveLG={isAboveLG} isOnTop={isOnTop} />
            ) : (
              <button
                className="text-iconSize hover:scale-90 transition duration-300"
                onClick={() => handleToggle()}
              >
                {" "}
                <IoMenu />{" "}
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
