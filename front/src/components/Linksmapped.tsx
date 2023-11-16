
import { NavLinks } from 'data/navLinks';
import { NavbarLink } from 'models/entities/navLink';

interface LinksMappedProps {
  isOnTop?: boolean;
  isAboveLG?: boolean;
}

const LinksMapped = ({ isOnTop, isAboveLG }: LinksMappedProps) => {
  return (
    <>
      {NavLinks.map((i: NavbarLink, index) => (
        <a
          key={index}
          href=""
          className="hover:text-primaryOnHover transition-all duration-300 flex flex-col justify-center items-center "
        >
          {isAboveLG ? (
            <span>
              {!i.linkIcon && i.linkText && (
                <span>{i.linkText}</span>
              )}
              {i.linkIcon && (
                <div
                  className={`${
                    isOnTop ? 'text-primary' : 'text-newWhite'
                  } text-iconSize  relative hover:text-primaryOnHover transition duration-300`}
                >
                  {<i.linkIcon />}
                  <span className="absolute h-[14px] w-[14px] bg-red-600 rounded-full -right-1 -top-2 text-newWhite text-[10px] flex justify-center items-center">
                    0
                  </span>
                </div>
              )}
            </span>
          ) : (
            <span>{i.linkText}</span>
          )}
        </a>
      ))}
    </>
  );
};

export default LinksMapped;
