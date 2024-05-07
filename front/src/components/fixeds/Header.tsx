import { IoMenu } from "react-icons/io5";
import React from "react";
import SideBarContext from "contexts/SidebarContext";
import useMediaQuery from "hooks/MediaScreen";
import Linksmapped from "components/Linksmapped";
import Input from "components/Input";
import LastTitleContext from "contexts/LastSearchedTitleContext";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import LoginContext from "contexts/LoginContext";
interface HeaderProps {
  isOnTop: boolean;
  showNav: boolean;
}
const Header = ({ isOnTop, showNav }: HeaderProps) => {
  const [searchParam, setSearchParam] = React.useState<string>("");
  const { handleLastSearchedTitle } = React.useContext(LastTitleContext);
  const { isToggled, handleToggle, setIsToggled } =
    React.useContext(SideBarContext);
  const navigate = useNavigate();
  const {isLoggedIn} = React.useContext(LoginContext);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      return navigate(`/searchedMovies?movieName=${searchParam}`);
    }
  };
  const handleGo = () => {
    return navigate(`/searchedMovies?movieName=${searchParam}`);
  };
  if (searchParam.length > 0) {
    handleLastSearchedTitle(searchParam);
  }
  const isAboveLG = useMediaQuery("(min-width: 1024px)");
  if (isAboveLG) setIsToggled(false);
  return (
    <>
      {showNav && (
        <nav className="h-[70px] mt-0 md:mt-[10px] w-full fixed top-0 text-newWhite z-50">
          <div className={` ${
              isOnTop
                ? !isToggled
                  ? "bg-primary"
                  : "bg-primaryBg"
                : "bg-primary/90"
            } transition-all duration-300 flex justify-between shadow-lg items-center h-full flex-row w-full px-6 md:w-[85%] md:rounded-xl mx-auto`}
          >
            <a href="/" className='text-newWhite text-smallDevicesTitle font-title font-black md:text-subTitle
             lg:text-title xl:text-navTitle cursor-pointer'
            >
              HubFilmes
            </a>
            {isLoggedIn && (
              <div className="w-3/4 px-4 md:px-0 md:w-1/3 h-1/2 relative flex flex-row items-center gap-1">
                <Input
                  hasText={searchParam.length > 0}
                  onChange={(e) => setSearchParam(e.target.value)}
                  onClick={() => setSearchParam("")}
                  type="text"
                  onKeyDown={handleEnter}
                  placeholder="Pesquise por um filme..."
                  value={searchParam}
                  withIcon
                  icon={<IoMdClose />}
                  height={40}
                />
                {searchParam.length > 0 && (
                  <button
                    className="border-2 border-border hover:bg-secondary hover:border-secondary transition duration-300 active:scale-95 h-[40px] px-4 rounded-lg font-semibold text-sm"
                    onClick={() => handleGo()}
                  >
                    Ir
                  </button>
                )}
              </div>
            )}
            <div className="text-links font-bold flex flex-row items-center gap-x-6">
              {isAboveLG ? (
                <Linksmapped isAboveLG={isAboveLG}/>
              ) : (
                <button className="text-iconSize active:scale-90 transition duration-300" onClick={() => handleToggle()}>
                  <IoMenu />
                </button>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
