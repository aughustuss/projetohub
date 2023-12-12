import React from "react";
import FavoritesMoviesContext from "contexts/FavoritesMoviesContext";
import { NavLinks } from "data/NavLinks";
import { NavbarLink } from "models/entities/NavLink";
import { AllCategories } from "data/Categories";
import { MdKeyboardArrowDown } from "react-icons/md";
interface LinksMappedProps {
  isOnTop?: boolean;
  isAboveLG?: boolean;
}

const LinksMapped = ({ isOnTop, isAboveLG }: LinksMappedProps) => {
  const { movies } = React.useContext(FavoritesMoviesContext);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = React.useState<boolean>(false);
  const handleCategoriesMenu = () => {
    setCategoriesMenuOpen(!categoriesMenuOpen);
  }
  return (
    <>
      {NavLinks.map((i: NavbarLink, index: number) => (
        <a
          key={index}
          href={i.linkTo}
          className={`hover:text-primaryOnHover transition-all duration-300 flex flex-col justify-center items-center w-full`}
        >
          {isAboveLG ? (
            <span>
              {!i.linkIcon && i.linkText !== "Filmes" && (
                <span>{i.linkText}</span>
              )}
              {!i.linkIcon && i.linkText === "Filmes" && (
                <div className="group relative w-full ">
                  <span className="hover:text-primaryOnHover">Filmes</span>
                  <div className="hidden group-hover:absolute group-hover:top-full group-hover:w-[320px] h-auto p-4 absolute text-xs gap-6 bg-primaryBgBorder shadow-lg shadow-black/40 rounded-lg group-hover:grid group-hover:grid-cols-3 group-hover:place-items-start group-hover:mx-auto">
                    {AllCategories.map((cat) => (
                      <a
                        href={`/genre/${cat.id}`}
                        className="text-start text-newWhite hover:text-primaryOnHover transition duration-300"
                        key={cat.id}
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {i.linkIcon && i.linkText === "Conversas" && (
                <div
                  className={`${
                    isOnTop ? "text-primary" : "text-newWhite"
                  } text-iconSize  relative hover:text-primaryOnHover transition duration-300 active:scale-95`}
                >
                  {<i.linkIcon />}

                  <span className="absolute h-[16px] w-[16px] bg-red-600 rounded-full -right-1 -top-2 text-newWhite text-[10px] flex justify-center items-center">
                    0
                  </span>
                </div>
              )}
              {i.linkIcon && i.linkText === "Favoritos" && (
                <div
                  className={`${
                    isOnTop ? "text-primary" : "text-newWhite"
                  } text-iconSize  relative hover:text-primaryOnHover transition duration-300 active:scale-95`}
                >
                  {<i.linkIcon />}
                  {movies && movies.length > 0 && (
                    <span className="absolute h-[16px] w-[16px] bg-red-600 rounded-full -right-1 -top-2 text-newWhite text-[10px] flex justify-center items-center">
                      {movies.length}
                    </span>
                  )}
                </div>
              )}
            </span>
          ) : (
            <>
            {i.linkText !== "Filmes" && i.linkText}
            {i.linkText == "Filmes" && (
              <div className="flex flex-col gap-y-1 w-full h-auto">
                <span className="flex flex-row items-center justify-center gap-x-2 relative w-full">Filmes <MdKeyboardArrowDown onClick={() => handleCategoriesMenu()} className={`${
                    categoriesMenuOpen ? "rotate-0" : "rotate-180"
                  } transition duration-300 absolute ml-[30%] text-lg`} /></span>
                  {categoriesMenuOpen && (
                  <div className="grid grid-cols-2 place-items-center justify-center items-center gap-4">
                    {AllCategories.map((cat) => (
                      <a href="" className="text-newWhite text-xs">{cat.name}</a>
                    ))}
                  </div>
                  )}
              </div>
            )}
            </>
          )}
        </a>
      ))}
    </>
  );
};

export default LinksMapped;
